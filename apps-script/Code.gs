/**
 * Nomadic Travel — lead capture web app.
 * Deploy from the contact@nomadictravel.co.in Google account (see README → "Google Apps Script").
 *
 * Receives JSON from the Next.js /api/lead route, appends a row to the
 * "Nomadic Travel Leads" sheet, emails contact@nomadictravel.co.in and
 * (optionally) sends the customer an auto-reply. Returns { ok, leadId }.
 *
 * Script properties (Project Settings → Script properties):
 *   LEADS_SECRET   – must match LEADS_SECRET in the website's env (required)
 *   SHEET_ID       – optional; if empty the script uses the spreadsheet it is bound to
 *   NOTIFY_EMAIL   – optional; extra comma-separated recipients (contact@nomadictravel.co.in always gets every lead)
 *   AUTO_REPLY     – "true" to email customers a confirmation (default "true")
 *   WHATSAPP_NUMBER – optional, digits only, used in the auto-reply
 */

var SHEET_NAME = 'Nomadic Travel Leads';
var LEAD_EMAIL = 'contact@nomadictravel.co.in';   // receives an email for every lead
var LEAD_SUBJECT = 'Lead Enquiry';
var HEADERS = [
  'Timestamp (IST)', 'Lead ID', 'Source', 'Name', 'Phone', 'Email', 'Tour', 'State',
  'Travel Date', 'Adults', 'Children', 'Budget', 'Message', 'Page URL', 'Status',
];

function doPost(e) {
  var props = PropertiesService.getScriptProperties();
  try {
    var data = JSON.parse((e && e.postData && e.postData.contents) || '{}');

    var secret = props.getProperty('LEADS_SECRET');
    if (!secret || data.secret !== secret) return respond_({ ok: false, error: 'unauthorized' });

    var lead = sanitize_(data);
    if (!lead.name || !lead.phone) return respond_({ ok: false, error: 'missing name or phone' });

    var lock = LockService.getScriptLock();
    lock.waitLock(20000);
    var duplicate = false;
    try {
      var sheet = getSheet_();
      duplicate = leadExists_(sheet, lead.leadId);
      if (!duplicate) {
        sheet.appendRow([
          Utilities.formatDate(new Date(), 'Asia/Kolkata', 'yyyy-MM-dd HH:mm:ss'),
          lead.leadId, lead.source, lead.name, "'" + lead.phone, lead.email, lead.tour, lead.state,
          lead.travelDate, lead.adults, lead.children, lead.budget, lead.message, lead.pageUrl, 'New',
        ]);
      }
    } finally {
      lock.releaseLock();
    }

    // Retries (same Lead ID) are stored once and do not re-send emails.
    if (!duplicate) {
      notifyTeam_(lead, props);
      if ((props.getProperty('AUTO_REPLY') || 'true') === 'true' && lead.email) autoReply_(lead, props);
    }
    return respond_({ ok: true, leadId: lead.leadId, duplicate: duplicate });
  } catch (err) {
    console.error(err);
    return respond_({ ok: false, error: String(err && err.message || err) });
  }
}

function doGet() {
  return respond_({ ok: true, service: 'nomadic-travel-leads' });
}

/* ---------- helpers ---------- */

function respond_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function str_(v, max) {
  return String(v == null ? '' : v).replace(/[\u0000-\u001F\u007F]/g, ' ').trim().slice(0, max || 200);
}

function sanitize_(d) {
  var leadId = /^NT-\d{6}-[A-Z0-9]{4}$/.test(d.leadId) ? d.leadId : makeLeadId_();
  var source = ['Booking', 'WhatsApp', 'Contact'].indexOf(d.source) >= 0 ? d.source : 'Booking';
  return {
    leadId: leadId,
    source: source,
    name: str_(d.name, 80),
    phone: str_(d.phone, 24),
    email: str_(d.email, 120),
    tour: str_(d.tour, 140),
    state: str_(d.state, 40),
    travelDate: str_(d.travelDate, 10),
    adults: Number(d.adults) || '',
    children: Number(d.children) || 0,
    budget: str_(d.budget, 40),
    message: str_(d.message, 2000),
    pageUrl: str_(d.pageUrl, 300),
  };
}

function makeLeadId_() {
  var d = Utilities.formatDate(new Date(), 'Asia/Kolkata', 'yyMMdd');
  var chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789', r = '';
  for (var i = 0; i < 4; i++) r += chars.charAt(Math.floor(Math.random() * chars.length));
  return 'NT-' + d + '-' + r;
}

function getSheet_() {
  var id = PropertiesService.getScriptProperties().getProperty('SHEET_ID');
  var ss = id ? SpreadsheetApp.openById(id) : SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold').setBackground('#163f2a').setFontColor('#ffffff');
  }
  return sheet;
}

function leadExists_(sheet, leadId) {
  var last = sheet.getLastRow();
  if (last < 2) return false;
  var start = Math.max(2, last - 499);
  var ids = sheet.getRange(start, 2, last - start + 1, 1).getValues();
  for (var i = 0; i < ids.length; i++) if (ids[i][0] === leadId) return true;
  return false;
}

function esc_(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
}

function notifyTeam_(lead, props) {
  var to = LEAD_EMAIL;
  var extra = (props.getProperty('NOTIFY_EMAIL') || '').split(',').map(function (e) { return e.trim(); })
    .filter(function (e) { return e && e.toLowerCase() !== LEAD_EMAIL; }).join(',');
  // "Lead Enquiry" first; name + Lead ID appended so Gmail doesn't merge every lead into one thread.
  var subject = LEAD_SUBJECT + ' — ' + lead.name + ' (' + lead.source + ', ' + lead.leadId + ')';
  var rows = [
    ['Lead ID', lead.leadId], ['Source', lead.source], ['Name', lead.name], ['Phone', lead.phone],
    ['Email', lead.email], ['Tour', lead.tour], ['State', lead.state], ['Travel date', lead.travelDate],
    ['Adults', lead.adults], ['Children', lead.children], ['Budget', lead.budget],
    ['Message', lead.message], ['Page', lead.pageUrl],
  ];
  var wa = 'https://wa.me/' + lead.phone.replace(/\D/g, '');
  var html =
    '<div style="font-family:Arial,sans-serif;max-width:620px">' +
    '<h2 style="color:#163f2a;margin:0 0 12px">Lead Enquiry: ' + esc_(lead.tour || 'General enquiry') + '</h2>' +
    '<table cellpadding="8" style="border-collapse:collapse;width:100%;font-size:14px">' +
    rows.filter(function (r) { return r[1] !== '' && r[1] != null; }).map(function (r) {
      return '<tr><td style="border:1px solid #e5e7eb;background:#f4f9ec;font-weight:bold;width:140px">' + esc_(r[0]) +
        '</td><td style="border:1px solid #e5e7eb">' + esc_(r[1]).replace(/\n/g, '<br>') + '</td></tr>';
    }).join('') +
    '</table>' +
    '<p style="margin-top:16px"><a href="' + wa + '" style="background:#25D366;color:#fff;padding:10px 16px;border-radius:6px;text-decoration:none">Reply on WhatsApp</a>' +
    (lead.email ? ' &nbsp; <a href="mailto:' + esc_(lead.email) + '">Reply by email</a>' : '') + '</p>' +
    '</div>';
  var mail = { to: to, subject: subject, htmlBody: html, replyTo: lead.email || to, name: 'Nomadic Travel Website' };
  if (extra) mail.cc = extra;
  MailApp.sendEmail(mail);
}

function autoReply_(lead, props) {
  var wa = props.getProperty('WHATSAPP_NUMBER');
  var html =
    '<div style="font-family:Arial,sans-serif;max-width:560px;color:#1f2937">' +
    '<p>Hi ' + esc_(lead.name.split(' ')[0]) + ',</p>' +
    '<p>Thank you for contacting <b>Nomadic Travel</b>' + (lead.tour ? ' about <b>' + esc_(lead.tour) + '</b>' : '') +
    '. Our Guwahati team will get back to you within a few hours (9am–8pm IST).</p>' +
    '<p>Your reference is <b>' + esc_(lead.leadId) + '</b>.</p>' +
    (wa ? '<p>Prefer chat? <a href="https://wa.me/' + wa + '?text=' + encodeURIComponent('Hi, my Lead ID is ' + lead.leadId) + '">Message us on WhatsApp</a>.</p>' : '') +
    '<p>Warm regards,<br>Nomadic Travel<br>contact@nomadictravel.co.in</p></div>';
  MailApp.sendEmail({ to: lead.email, subject: 'We received your enquiry (' + lead.leadId + ') — Nomadic Travel', htmlBody: html, name: 'Nomadic Travel' });
}

/** Run once from the editor to authorise Sheets + Mail scopes and create the header row. */
function setup() {
  getSheet_();
  Logger.log('Sheet ready. Remaining daily email quota: ' + MailApp.getRemainingDailyQuota());
}

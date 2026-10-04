import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Page, Panel, TopBar } from "@/components/ui/Minimal";
import { BookingForm } from "@/components/lead/BookingForm";
import { WhatsAppButton } from "@/components/lead/WhatsAppButton";
import { CarsPanel } from "@/components/cards/CarsPanel";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { organizationSchema } from "@/lib/schema";
import { site } from "@/data/site";

export const metadata = buildMetadata({
  title: "Contact Nomadic Travel | Guwahati, Assam",
  description: "Contact Nomadic Travel in Guwahati for Northeast India tour packages. Call +91 60000 60220, email contact@nomadictravel.co.in or chat on WhatsApp.",
  path: "/contact",
});

export default function ContactPage() {
  const a = site.address;
  return (
    <>
      <JsonLd data={organizationSchema()} />
      <TopBar title="Contact" />
      <Page>
        <Breadcrumbs items={[{ name: "Contact", href: "/contact" }]} />
        <header className="px-1">
          <h1 className="text-3xl text-forest-950">Contact us</h1>
          <p className="mt-2 text-sm leading-6 text-slate-700">Tell us your dates and interests — we&apos;ll send a personalised itinerary and quote within 24 hours.</p>
        </header>
        <WhatsAppButton label="Chat on WhatsApp" className="btn-whatsapp w-full rounded-2xl py-3.5 text-[13px] uppercase tracking-[0.08em]" />
        <BookingForm source="Contact" title="Send us an enquiry" />
        <CarsPanel />
        <Panel title="Our office">
          <address className="space-y-3 text-sm not-italic text-slate-700">
            <p className="flex gap-3"><MapPin className="mt-0.5 h-4 w-4 flex-none text-forest-700" aria-hidden /><span><strong className="text-forest-900">{site.name}</strong><br />{a.street}, {a.locality}, {a.region} {a.postalCode}, India</span></p>
            <p className="flex gap-3"><Phone className="h-4 w-4 flex-none text-forest-700" aria-hidden /><a href={`tel:${site.phoneE164}`} className="link">{site.phone}</a></p>
            <p className="flex gap-3"><Mail className="h-4 w-4 flex-none text-forest-700" aria-hidden /><a href={`mailto:${site.email}`} className="link">{site.email}</a></p>
            <p className="flex gap-3"><Clock className="h-4 w-4 flex-none text-forest-700" aria-hidden />Every day, 9:00 am – 8:00 pm IST</p>
          </address>
          <a href={site.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="link mt-3 inline-block text-sm">Open in Google Maps ↗</a>
        </Panel>
      </Page>
    </>
  );
}

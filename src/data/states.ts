import type { StateInfo, StateSlug } from "@/types";

const VERIFY = "Permit rules change. Always verify on the official portal before you travel.";

export const states: StateInfo[] = [
  {
    slug: "assam",
    name: "Assam",
    pageSlug: "assam-tour-packages",
    primaryKeyword: "Assam tour package",
    metaTitle: "Assam Tour Packages 2026 | Kaziranga, Majuli & Tea Trails",
    metaDescription:
      "Assam tour packages from Guwahati: Kaziranga rhino safaris, Majuli satras, Sivasagar heritage and tea estate stays. Custom itineraries by local experts.",
    tagline: "Rhinos, river islands and the world's most famous tea",
    heroImage: "place:kaziranga-national-park",
    accent: { text: "text-assam", bg: "bg-assam", soft: "bg-forest-50", ring: "ring-assam", hex: "#2f7a50" },
    capital: "Dispur (Guwahati)",
    gateway: "Guwahati (GAU)",
    intro: [
      "An Assam tour package is the easiest way into Northeast India, and for most travellers it is also the most rewarding. Assam sits in the broad valley of the Brahmaputra, one of Asia's great rivers, and almost every journey to the other northeastern states begins in its capital region of Guwahati. Yet Assam is far more than a transit point. It is home to Kaziranga National Park, where roughly two-thirds of the world's greater one-horned rhinoceros live, to Majuli, a vast inhabited river island known for its Vaishnavite monasteries, and to the tea gardens that produce the malty, full-bodied leaf the state is famous for worldwide.",
      "Our Assam tours are designed around what the state does best: wildlife, river life, living culture and history. You can spend dawn on an open jeep in the tall elephant grass of Kaziranga, watch the sun set over the Brahmaputra from a country boat, take part in a mask-making demonstration in a Majuli satra, and walk through the brick pavilions and temples left by the Ahom kings who ruled this valley for six centuries. Evenings are for Assamese thalis, Bihu songs and quiet tea estate bungalows.",
      "Road distances in Assam are long but the highways are good, so we pace every itinerary to avoid more than five or six hours of driving in a day. Most of our Assam packages start and end in Guwahati, with Jorhat and Dibrugarh used as gateways for Upper Assam, Majuli and the eastern rainforests. Assam also combines naturally with Meghalaya, Arunachal Pradesh and Nagaland, and our combo tours appear on each state page they cover.",
    ],
    bestTime: {
      summary:
        "October to April is the best time for an Assam tour. Kaziranga, Manas and Nameri open for safaris in October or November and close by May or June before the monsoon floods. Winter days are dry, clear and pleasant (10–25°C), ideal for wildlife and river cruises.",
      seasons: [
        { name: "Winter", months: "Nov – Feb", icon: "winter", notes: "Peak season. Clear skies, cool mornings, excellent rhino and bird sightings. Book safaris early in December and January." },
        { name: "Spring", months: "Mar – Apr", icon: "sun", notes: "Grass is burnt and short, so animal sightings in Kaziranga are often at their best. Rongali Bihu in mid-April." },
        { name: "Monsoon", months: "Jun – Sep", icon: "rain", notes: "National parks close and the Brahmaputra floods. Good for tea gardens, Guwahati temples and Kamakhya's Ambubachi Mela (June)." },
        { name: "Autumn", months: "Oct", icon: "season", notes: "Parks reopen (some ranges in early October), landscapes are green and crowds are thin. Durga Puja season." },
      ],
    },
    howToReach: [
      { mode: "air", title: "By air", text: "Lokpriya Gopinath Bordoloi International Airport (GAU) in Guwahati has direct flights from Delhi, Mumbai, Kolkata, Bengaluru and other metros. Jorhat (JRH), Dibrugarh (DIB), Tezpur (TEZ) and Silchar (IXS) airports serve Upper Assam and the Barak Valley." },
      { mode: "rail", title: "By train", text: "Guwahati is the main rail hub of the Northeast, with Rajdhani and Vande Bharat services. Kamakhya, Jorhat, Dibrugarh and New Tinsukia stations are useful for Upper Assam itineraries." },
      { mode: "road", title: "By road", text: "NH27 links Guwahati to Siliguri and the rest of India. Within Assam, NH715 runs from Guwahati towards Kaziranga (about 4.5–5 hours) and Jorhat. Our tours use private vehicles with experienced local drivers." },
    ],
    permit: {
      title: "Permits for Assam",
      indian: "Indian citizens do not need any permit to visit Assam. Carry a government photo ID. National parks require entry and safari tickets, which we arrange.",
      foreign: "Foreign nationals do not need a Protected Area Permit for Assam itself. A valid Indian visa and passport are enough. If your trip continues into Arunachal Pradesh or Nagaland, a PAP is required for those states. " + VERIFY,
      links: [
        { label: "Assam Tourism (official)", href: "https://assamtourism.gov.in" },
        { label: "e-FRRO (foreigner services)", href: "https://indianfrro.gov.in" },
      ],
    },
    culture: [
      {
        heading: "Wildlife: Kaziranga, Manas and beyond",
        paragraphs: [
          "Assam protects some of the richest wildlife habitat in South Asia. Kaziranga and Manas are both UNESCO World Heritage Sites (inscribed in 1985). Kaziranga is famous for rhinos, wild water buffalo, swamp deer and a high density of tigers, while Manas, on the Bhutan border, shelters rare species such as the pygmy hog and golden langur. Pobitora Wildlife Sanctuary, an easy day trip from Guwahati, has one of the highest rhino densities anywhere. Nameri, Dibru-Saikhowa and Dehing Patkai add river safaris, rainforest walks and superb birdwatching.",
          "Jeep safaris run in the mornings and afternoons inside designated ranges. Elephant-back rides are still offered in some parks; we explain the welfare debate honestly and are happy to plan jeep-only safaris on request.",
        ],
      },
      {
        heading: "Satras, temples and the Ahom legacy",
        paragraphs: [
          "Assamese culture is shaped by the neo-Vaishnavite movement founded by the 15th–16th century saint-reformer Srimanta Sankardeva. Its monasteries, called satras, still teach Sattriya dance, devotional music and Bhaona theatre, and the satras of Majuli are among the most important. Guwahati's Kamakhya Temple on Nilachal Hill is one of the most revered Shakti shrines in India.",
          "From the 13th to the early 19th century the Ahom dynasty ruled the Brahmaputra valley. Their capitals around Sivasagar left monuments such as the Rang Ghar pavilion, the Talatal Ghar palace and the Shivadol temple, and the Charaideo Moidams (royal burial mounds) were inscribed as a UNESCO World Heritage Site in 2024.",
        ],
      },
      {
        heading: "Tea, silk and Assamese food",
        paragraphs: [
          "Tea was first commercially cultivated in Assam in the 1830s and today the state produces a large share of India's tea. A night in a heritage tea bungalow around Jorhat or Dibrugarh, with a walk through the bushes and a guided tasting, is one of the gentlest pleasures of an Assam trip. Sualkuchi, near Guwahati, is the centre of Assam's handloom silk, including the golden muga silk unique to the state.",
          "Assamese food is subtle rather than spicy: rice with dal, tangy fish curry (masor tenga), duck with ash gourd, bamboo shoot, and pitha rice cakes during Bihu. We include at least one traditional Assamese meal in every Assam itinerary.",
        ],
      },
    ],
    travelTips: [
      "Book Kaziranga safari slots well in advance for December–January and long weekends.",
      "Carry light layers: winter mornings in open jeeps are cold, afternoons are warm.",
      "Majuli's ferries run in daylight only; plan to reach Nimati Ghat by early afternoon.",
      "Dress modestly and remove footwear at satras and temples.",
      "Most parks close from roughly June to September; check opening dates before booking flights.",
    ],
    faqs: [
      { q: "How many days are enough for an Assam tour?", a: "Three to four days covers Guwahati and Kaziranga. Six to seven days lets you add Majuli, Sivasagar and a tea estate stay. If you want Manas or the Upper Assam rainforests as well, plan 8–10 days." },
      { q: "Which is the best time to visit Kaziranga?", a: "November to April. The park usually opens in October (some ranges partly) and closes by May or June. February to April often gives the best rhino sightings because the grass is shorter." },
      { q: "Do I need a permit to visit Assam?", a: "No. Neither Indian citizens nor foreign nationals need a special permit for Assam. You only need park entry and safari tickets, which we book for you." },
      { q: "Can I combine Assam with Meghalaya?", a: "Yes. Shillong is about three hours by road from Guwahati, so an Assam + Meghalaya trip of 6–7 days is our most popular combination." },
      { q: "Is Assam safe for tourists?", a: "Yes. Tourist circuits such as Guwahati, Kaziranga, Majuli and Sivasagar are safe and well established. As anywhere, follow local advice and travel with a registered operator." },
    ],
  },
  {
    slug: "arunachal-pradesh",
    name: "Arunachal Pradesh",
    pageSlug: "arunachal-pradesh-tour-packages",
    primaryKeyword: "Arunachal Pradesh tour package",
    metaTitle: "Arunachal Pradesh Tour Packages | Tawang, Ziro & Mechuka",
    metaDescription:
      "Arunachal Pradesh tour packages: Tawang monastery, Sela Pass, Ziro Valley, Mechuka and Namdapha. ILP assistance, local drivers and custom itineraries.",
    tagline: "Monasteries, high passes and the land of the dawn-lit mountains",
    heroImage: "place:tawang-monastery",
    accent: { text: "text-arunachal", bg: "bg-arunachal", soft: "bg-amber-50", ring: "ring-arunachal", hex: "#c2410c" },
    capital: "Itanagar",
    gateway: "Guwahati, Tezpur, Dibrugarh or Itanagar (Hollongi)",
    intro: [
      "An Arunachal Pradesh tour package takes you into India's largest northeastern state, a mountainous land that rises from the Assam plains to snow peaks on the borders with Bhutan, Tibet and Myanmar. Its name means 'land of the dawn-lit mountains', and with some of the earliest sunrises in India it lives up to it. Arunachal is home to dozens of distinct tribes, including the Monpa of Tawang, the Apatani of Ziro, the Adi of the Siang valley and the Mishmi of Dibang and Lohit, each with its own festivals, crafts and architecture.",
      "Most visitors come for Tawang: the 17th-century monastery perched on a ridge at around 3,000 m, the drive over the 4,170 m Sela Pass, frozen high-altitude lakes and the war memorials of 1962. But Arunachal rewards travellers who look further. Ziro's rice fields and Apatani villages, Mechuka's wide Tibetan-style valley, the rainforests of Namdapha and Pakke, the snow at Mayudia and the white water of the Siang are all reachable with a little more time.",
      "Travel in Arunachal is slower than in the plains. Mountain roads are improving fast (the Sela Tunnel opened in 2024), but landslides, weather and army convoys can still cause delays, so our itineraries keep driving days realistic and build in buffer time. Every Indian visitor needs an Inner Line Permit and foreigners need a Protected Area Permit; we handle both for our guests.",
    ],
    bestTime: {
      summary:
        "March to June and September to November are the best months for an Arunachal Pradesh tour. Skies are clearest in October–November. December to February brings snow to Tawang, Sela and Mayudia, beautiful but with occasional road closures. July and August are the wettest months, with frequent landslides.",
      seasons: [
        { name: "Spring", months: "Mar – May", icon: "sun", notes: "Rhododendrons bloom on the Tawang route, pleasant days, good for Ziro and Mechuka. Some high lakes still frozen in March." },
        { name: "Monsoon", months: "Jun – Aug", icon: "rain", notes: "Heavy rain and landslides; travel only with flexible plans. Lush green landscapes in Ziro." },
        { name: "Autumn", months: "Sep – Nov", icon: "season", notes: "Best visibility and stable roads. Ziro Festival of Music (late September), harvest season in Ziro." },
        { name: "Winter", months: "Dec – Feb", icon: "winter", notes: "Snow at Sela, Tawang and Mayudia. Torgya festival in Tawang (January) and Losar (February/March). Very cold nights." },
      ],
    },
    howToReach: [
      { mode: "air", title: "By air", text: "Donyi Polo Airport at Hollongi near Itanagar has flights from Guwahati, Kolkata and Delhi. For Tawang, most travellers fly into Guwahati or Tezpur. Pasighat and Tezu have small regional airports with limited flights. Dibrugarh (Assam) is the best gateway for Mechuka, Roing and Namdapha." },
      { mode: "rail", title: "By train", text: "Naharlagun station near Itanagar has services from Guwahati and Delhi. Bhalukpong and Murkongselek have smaller stations. Most itineraries use Guwahati, Rangapara North or Dibrugarh railheads." },
      { mode: "road", title: "By road", text: "Tawang is about 450 km (12–14 hours) from Guwahati, so we break the journey at Dirang or Bomdila. Ziro is about 100 km from Itanagar. Mechuka is reached from Aalo, and Roing/Anini from Dibrugarh or Tinsukia via the Dhola–Sadiya bridge." },
    ],
    permit: {
      title: "Inner Line Permit (ILP) & PAP for Arunachal Pradesh",
      indian:
        "All Indian citizens from outside the state need an Inner Line Permit (ILP). Apply online at the official eILP portal with a photo ID and passport-size photo; tourist permits are usually issued within hours and fees depend on duration. Carry printed copies — they are checked at entry gates such as Bhalukpong, Banderdewa and Bomjir. Bum La Pass and Madhuri (Shungatser) Lake need an additional pass from the DC office / Army in Tawang, issued to Indian citizens only.",
      foreign:
        "Foreign nationals need a Protected Area Permit (PAP), generally applied for through a registered tour operator with your passport and visa details. A government fee (typically around USD 50) applies, and some areas such as Bum La remain closed to foreigners. Citizens of certain countries need prior clearance from the Ministry of Home Affairs. " + VERIFY,
      links: [
        { label: "Arunachal eILP portal (official)", href: "https://eilp.arunachal.gov.in" },
        { label: "Arunachal Tourism (official)", href: "https://arunachaltourism.com" },
        { label: "e-FRRO / PAP information", href: "https://indianfrro.gov.in" },
      ],
    },
    culture: [
      {
        heading: "Monasteries and Monpa culture of western Arunachal",
        paragraphs: [
          "Western Arunachal, around Tawang, Dirang and Bomdila, is home to the Monpa, who follow Tibetan Buddhism. Tawang Monastery, founded in 1680–81 by Merak Lama Lodre Gyatso, is the largest monastery in India and the spiritual heart of the region. Nearby Urgelling Monastery is regarded as the birthplace of the Sixth Dalai Lama. Villages are built of stone and timber, prayer flags fly over every pass, and the Torgya and Losar festivals bring masked dances to monastery courtyards in winter.",
          "Military history is part of the landscape too. The 1962 Sino-Indian war was fought along this route; the Tawang War Memorial and the Jaswant Garh memorial near Sela honour those who served.",
        ],
      },
      {
        heading: "Tribal festivals and village life",
        paragraphs: [
          "Central and eastern Arunachal follow indigenous faiths such as Donyi-Polo alongside Christianity and Buddhism. The Apatani of Ziro are known for their highly productive wet-rice and fish farming, their traditional facial tattoos and nose plugs (now no longer practised by younger generations) and the Myoko and Dree festivals. The Adi celebrate Solung around 1 September, and the Mishmi of Dibang and Lohit celebrate Reh.",
          "We work with village guides and homestays, so visitors meet communities on their terms. Always ask before photographing people, and remember that some rituals are private.",
        ],
      },
      {
        heading: "Adventure: treks, rivers and wildlife",
        paragraphs: [
          "Arunachal has some of India's least explored trekking country, from day hikes in Ziro and Mechuka to multi-day routes around Tawang. The Siang (the Brahmaputra's upper course) offers expedition-grade rafting, while the Kameng near Bhalukpong is gentler and known for angling. Eaglenest Wildlife Sanctuary, where the Bugun liocichla was described as a new species in 2006, is one of Asia's premier birding sites, and Namdapha National Park in Changlang is among the largest protected areas in the Eastern Himalaya biodiversity hotspot.",
        ],
      },
    ],
    travelTips: [
      "Apply for your ILP or PAP at least a week before travel and carry several printouts.",
      "Altitudes above 3,000 m (Sela, Bum La, Madhuri Lake) can cause altitude sickness; ascend gradually and stay hydrated.",
      "Mobile networks are patchy beyond towns; download offline maps.",
      "Carry cash: ATMs are scarce outside Tawang, Bomdila, Ziro, Pasighat and Itanagar.",
      "Expect delays from weather or road work and keep a buffer day for flights home.",
    ],
    faqs: [
      { q: "How many days do I need for a Tawang trip?", a: "At least six nights from Guwahati: two days to drive up via Dirang, two days in Tawang (one for Bum La and Madhuri Lake if permitted) and two days to return via Bomdila. Seven or eight nights is more relaxed." },
      { q: "Is an ILP required for Arunachal Pradesh?", a: "Yes. Every Indian citizen from outside Arunachal needs an Inner Line Permit, available online at eilp.arunachal.gov.in. Foreigners need a Protected Area Permit instead." },
      { q: "Can foreigners visit Tawang?", a: "Yes, with a Protected Area Permit arranged through a registered tour operator. Bum La Pass is open to Indian citizens only." },
      { q: "When does it snow in Tawang?", a: "Snowfall at Sela Pass and Tawang is most likely between December and February, sometimes into March. Heavy snow can close roads for a day or two." },
      { q: "Is Ziro worth visiting outside the music festival?", a: "Absolutely. Ziro's Apatani villages, pine-covered hills and rice fields are beautiful from March to November, and the valley is calm and uncrowded outside festival week." },
    ],
  },
  {
    slug: "meghalaya",
    name: "Meghalaya",
    pageSlug: "meghalaya-tour-packages",
    primaryKeyword: "Meghalaya tour package",
    metaTitle: "Meghalaya Tour Packages from Guwahati | Shillong & Cherrapunji",
    metaDescription:
      "Meghalaya tour packages from Guwahati: Shillong, Cherrapunji, living root bridges, Dawki's Umngot River and Mawlynnong. Expert drivers and homestays.",
    tagline: "The abode of clouds, waterfalls and living root bridges",
    heroImage: "place:nohkalikai-falls",
    accent: { text: "text-meghalaya", bg: "bg-meghalaya", soft: "bg-mist-50", ring: "ring-meghalaya", hex: "#3e6a8a" },
    capital: "Shillong",
    gateway: "Guwahati (GAU) or Shillong (Umroi)",
    intro: [
      "A Meghalaya tour package from Guwahati is the classic first trip to Northeast India, and it is easy to see why. Within three hours of Guwahati airport the road climbs into the Khasi Hills, the air cools, and you reach Shillong, a lively hill city of pine trees, cafés and music. Beyond it lie the plunging gorges of Sohra (Cherrapunji), some of the wettest places on Earth, where waterfalls such as Nohkalikai drop hundreds of metres into turquoise pools and the Khasi people have grown bridges from living tree roots.",
      "Meghalaya, 'the abode of clouds', is made up of the Khasi, Jaintia and Garo Hills. Our Meghalaya tours focus on the Khasi and Jaintia regions, where the highlights are close together: the double-decker root bridge at Nongriat, the clean village of Mawlynnong, the glass-clear Umngot River at Dawki and Shnongpdeng, the canyons of Laitlum, sacred forests at Mawphlang and the ancient monoliths of Nartiang. Adventure travellers can add caving, kayaking, ziplining and camping.",
      "Distances are short but roads are hilly and narrow, so we keep each day to a comfortable loop. Most visitors base themselves in Shillong and Sohra, with an optional night in a riverside camp at Shnongpdeng or a homestay at Nongriat. Meghalaya pairs perfectly with Kaziranga in Assam for a one-week Northeast holiday.",
    ],
    bestTime: {
      summary:
        "October to April is the best time for a Meghalaya tour if you want clear views, comfortable treks and the crystal-clear Umngot River. June to September is the monsoon: waterfalls are at their most spectacular, but rain, fog and slippery trails are guaranteed.",
      seasons: [
        { name: "Autumn", months: "Oct – Nov", icon: "season", notes: "Fresh green hills, full waterfalls and clearing skies. Shillong Cherry Blossom Festival (usually November)." },
        { name: "Winter", months: "Dec – Feb", icon: "winter", notes: "Driest, clearest months. Umngot River at its clearest for Dawki boating. Waterfalls are thinner. Cold nights in Shillong (2–5°C)." },
        { name: "Spring", months: "Mar – May", icon: "sun", notes: "Pleasant weather, good for treks and caving. Pre-monsoon showers begin in May." },
        { name: "Monsoon", months: "Jun – Sep", icon: "rain", notes: "Spectacular waterfalls and dramatic clouds; Dawki river turns murky and boating may stop. Carry rain gear." },
      ],
    },
    howToReach: [
      { mode: "air", title: "By air", text: "Guwahati (GAU) is the main gateway, about 100 km (3 hours) from Shillong. Shillong Airport at Umroi has limited flights. We pick up from Guwahati airport or railway station." },
      { mode: "rail", title: "By train", text: "Meghalaya has no major passenger railhead on tourist routes; Guwahati railway station is the nearest, with good connections across India." },
      { mode: "road", title: "By road", text: "NH6 connects Guwahati to Shillong (about 3 hours). Sohra is 55 km south of Shillong (1.5 hours), Dawki about 82 km (2.5–3 hours) and Mawlynnong about 78 km. Self-drive rentals for tourists are restricted in Meghalaya, so use a licensed operator." },
    ],
    permit: {
      title: "Permits & registration for Meghalaya",
      indian:
        "Meghalaya does not have an Inner Line Permit system. Indian citizens only need a government photo ID. Since 2025, hotels, homestays and resorts must register guests on the state tourism app, so carry ID for check-in. In July 2026 the state announced a wider visitor registration system that was not yet operational at the time of writing.",
      foreign:
        "Foreign nationals do not need a Protected Area Permit for Meghalaya's main tourist areas; a valid passport and Indian visa are sufficient. Border viewpoints near Dawki are managed by the BSF. " + VERIFY,
      links: [
        { label: "Meghalaya Tourism (official)", href: "https://www.meghalayatourism.in" },
        { label: "e-FRRO (foreigner services)", href: "https://indianfrro.gov.in" },
      ],
    },
    culture: [
      {
        heading: "Living root bridges and Khasi traditions",
        paragraphs: [
          "The living root bridges of Meghalaya are one of the most remarkable examples of indigenous engineering anywhere. Over generations, Khasi and War-Jaintia communities guided the aerial roots of the Indian rubber fig (Ficus elastica) across streams until they formed strong, self-repairing bridges. The double-decker bridge at Nongriat and the Riwai bridge near Mawlynnong are the best known, and the living root bridges have been placed on UNESCO's tentative World Heritage list.",
          "Khasi society is matrilineal: lineage and property pass through the youngest daughter. Many villages also protect sacred forests, such as Mawphlang, where nothing may be removed. Visitors are welcome, but local rules matter — follow your guide's advice.",
        ],
      },
      {
        heading: "Waterfalls, canyons and caves",
        paragraphs: [
          "Meghalaya's plateau ends in steep escarpments that drop towards the Bangladesh plains, creating spectacular waterfalls. Nohkalikai, about 340 m, is India's tallest plunge waterfall, while Seven Sisters (Nohsngithiang), Elephant Falls, Wei Sawdong and Krang Suri each have their own character. The same limestone hills hide India's longest caves: Krem Liat Prah in the Jaintia Hills has been surveyed to more than 30 km.",
        ],
      },
      {
        heading: "Shillong's music and food",
        paragraphs: [
          "Shillong has a famous music culture, with rock, blues and choir traditions, plus a café scene around Laitumkhrah and Police Bazaar. Try Khasi dishes such as jadoh (rice cooked with pork), doh khlieh (pork salad), tungrymbai (fermented soybean) and pumaloi (steamed rice cakes) at local eateries.",
        ],
      },
    ],
    travelTips: [
      "The Nongriat double-decker trek involves about 3,500 steps each way; wear good shoes and start early.",
      "Visit Dawki between November and April for the clearest water.",
      "Carry a light rain jacket year-round — Sohra can be misty even in winter.",
      "Many villages charge small entry or parking fees; carry change.",
      "Respect 'no plastic' and 'no photography' signs in villages and sacred forests.",
    ],
    faqs: [
      { q: "How many days are enough for Meghalaya?", a: "Four to five days covers Shillong, Sohra (Cherrapunji), the double-decker root bridge, Mawlynnong and Dawki comfortably. Add a day for Shnongpdeng camping or Nartiang and Krang Suri in the Jaintia Hills." },
      { q: "Do I need an ILP for Meghalaya?", a: "No. Meghalaya does not have an Inner Line Permit system. Hotels and homestays register guests with the state, so carry a photo ID." },
      { q: "When is Dawki's water clearest?", a: "From roughly November to April, when there is little rain and the Umngot River runs clear enough to see the riverbed beneath the boats." },
      { q: "Is the Nongriat root bridge trek difficult?", a: "It is moderate. The path is well built but steep, with about 3,500 stone steps down and back up. Most reasonably fit people manage it in 4–6 hours round trip." },
      { q: "Can I do Meghalaya from Guwahati as a day trip?", a: "A day trip to Shillong is possible, but Sohra and Dawki need at least one night. We recommend a minimum of three nights." },
    ],
  },
  {
    slug: "nagaland",
    name: "Nagaland",
    pageSlug: "nagaland-tour-packages",
    primaryKeyword: "Nagaland tour package",
    metaTitle: "Nagaland Tour Packages | Hornbill Festival, Kohima & Dzukou",
    metaDescription:
      "Nagaland tour packages: Hornbill Festival, Kohima, Khonoma green village, Dzukou Valley trek and Konyak villages of Mon. ILP help and local Naga guides.",
    tagline: "Hill tribes, warrior heritage and the Festival of Festivals",
    heroImage: "place:dzukou-valley",
    accent: { text: "text-nagaland", bg: "bg-nagaland", soft: "bg-rose-50", ring: "ring-nagaland", hex: "#9f1239" },
    capital: "Kohima",
    gateway: "Dimapur (DMU)",
    intro: [
      "A Nagaland tour package is a journey into one of the most culturally distinctive corners of India. Nagaland is home to more than a dozen major Naga tribes — among them the Angami, Ao, Konyak, Sumi, Lotha, Chakhesang and Phom — each with its own language, dress, festivals and village traditions. Hilltop villages, carved wooden gates and morungs (traditional dormitories) tell the story of warrior societies that have embraced Christianity and modern life while fiercely protecting their identity.",
      "Most visitors come for the Hornbill Festival, held every year from 1 to 10 December at Kisama Heritage Village near Kohima, where all the tribes gather for dances, games, crafts and food. But Nagaland is rewarding all year. You can walk through Khonoma, India's first 'green village'; trek to the rolling meadows of Dzukou Valley; visit the moving Kohima War Cemetery; meet tattooed Konyak elders in Mon and Longwa on the Myanmar border; or watch Amur falcons swirl over Doyang reservoir in autumn.",
      "Nagaland's roads are mountainous and can be slow, especially in the monsoon, so our itineraries focus on one or two regions at a time. Dimapur is the gateway by air and rail; Kohima is about three hours away. Every visitor needs an Inner Line Permit and foreign nationals currently also need a Protected Area Permit — we arrange both.",
    ],
    bestTime: {
      summary:
        "October to May is the best time for a Nagaland tour. December is the busiest month thanks to the Hornbill Festival (1–10 December). Dzukou Valley is greenest in June–September (when lilies bloom) but trails are muddy; October–November is the best compromise for trekking.",
      seasons: [
        { name: "Autumn", months: "Oct – Nov", icon: "season", notes: "Clear skies, ideal for Dzukou and Japfu treks. Amur falcon roosting at Doyang (late October–early November)." },
        { name: "Winter", months: "Dec – Feb", icon: "winter", notes: "Hornbill Festival 1–10 December. Cold, dry and sunny days; frosty nights in Kohima and Pfutsero. Sekrenyi (Angami) in February." },
        { name: "Spring", months: "Mar – May", icon: "sun", notes: "Rhododendrons on Japfu, pleasant weather. Aoleang (Konyak, early April) and Moatsu (Ao, early May) festivals." },
        { name: "Monsoon", months: "Jun – Sep", icon: "rain", notes: "Lush landscapes and Dzukou lilies, but heavy rain and landslides on some roads." },
      ],
    },
    howToReach: [
      { mode: "air", title: "By air", text: "Dimapur Airport (DMU) has flights from Kolkata, Guwahati and other cities. Kohima is about 75 km (2.5–3 hours) from Dimapur. Jorhat Airport in Assam is the easiest gateway for Mon and Longwa." },
      { mode: "rail", title: "By train", text: "Dimapur is Nagaland's main railway station, on the Guwahati–Dibrugarh line. A new line towards Kohima (Zubza) is under construction." },
      { mode: "road", title: "By road", text: "NH29 links Dimapur and Kohima. Guwahati to Kohima is about 340 km by road (8–9 hours). Mon is reached from Sonari in Assam, and Mokokchung from Jorhat via Amguri/Tuli." },
    ],
    permit: {
      title: "Inner Line Permit (ILP) & PAP for Nagaland",
      indian:
        "Indian citizens who are not indigenous to Nagaland need an Inner Line Permit, applied for online at the official Nagaland ILP portal. A tourist ILP currently costs ₹200 and is valid for 30 days; online applications filed in working hours are often approved within a few hours. Offline applications are no longer accepted. Carry printouts, as permits are checked at entry points including Dimapur.",
      foreign:
        "Foreign nationals need a Nagaland ILP (currently ₹500 for 30 days) and a Protected Area Permit (PAP). The PAP requirement for Nagaland was reinstated by the Ministry of Home Affairs in December 2024; the state assembly has asked for it to be withdrawn, but it was still in force at the time of writing. " + VERIFY,
      links: [
        { label: "Nagaland ILP portal (official)", href: "https://ilp.nagaland.gov.in" },
        { label: "Nagaland Tourism (official)", href: "https://tourism.nagaland.gov.in" },
        { label: "e-FRRO / PAP information", href: "https://indianfrro.gov.in" },
      ],
    },
    culture: [
      {
        heading: "The Hornbill Festival",
        paragraphs: [
          "Launched by the Government of Nagaland in 2000, the Hornbill Festival is named after the great hornbill, a bird that features in the folklore and headgear of many Naga tribes. For ten days each December, Kisama Heritage Village becomes a living museum: each tribe's morung hosts dances, songs, traditional games and food stalls, while evenings bring rock concerts, a night bazaar in Kohima and events such as the Naga king chilli eating contest.",
        ],
      },
      {
        heading: "Villages, morungs and Naga crafts",
        paragraphs: [
          "Naga villages are traditionally built on ridgetops for defence, divided into clans or khels with their own gates. Angami villages such as Khonoma, Kigwema and Jakhama around Kohima are known for terraced rice fields, while the Konyak villages of Mon district are famous for their chiefs (Anghs), log drums and the facial tattoos of elders who took part in head-hunting before it ended in the mid-20th century. Naga shawls, woven on back-strap looms with tribe-specific patterns, make meaningful souvenirs.",
        ],
      },
      {
        heading: "World War II and the Battle of Kohima",
        paragraphs: [
          "In April–June 1944 Kohima was the scene of one of the decisive battles of the Burma Campaign, when Allied forces halted the Japanese advance into India. Fighting across the Deputy Commissioner's tennis court is commemorated at the Kohima War Cemetery, maintained by the Commonwealth War Graves Commission, with its famous epitaph beginning 'When you go home, tell them of us and say…'.",
        ],
      },
    ],
    travelTips: [
      "Apply for your Nagaland ILP online before travel and carry printouts.",
      "Book Hornbill Festival accommodation two to three months in advance.",
      "Sundays are quiet in Nagaland: many shops and sites close for church.",
      "Ask permission before photographing people, especially tattooed elders in Mon.",
      "Naga food uses fermented bamboo shoot, axone and the fiery king chilli — ask for mild options if needed.",
    ],
    faqs: [
      { q: "When is the Hornbill Festival?", a: "Every year from 1 to 10 December at Kisama Heritage Village, about 12 km from Kohima." },
      { q: "Do I need an ILP for Nagaland?", a: "Yes. Indian citizens not indigenous to Nagaland need an Inner Line Permit, available online at ilp.nagaland.gov.in. Foreign tourists need both a Nagaland ILP and a Protected Area Permit." },
      { q: "How difficult is the Dzukou Valley trek?", a: "It is an easy-to-moderate trek. The Viswema route is about 8 km one way with roughly 900 m of climbing; most people reach the rest house in 3–5 hours." },
      { q: "How many days are enough for Nagaland?", a: "Four to five days covers Kohima, Khonoma, Kisama and Dzukou. Add three or four days to visit Mokokchung, Mon and Longwa." },
      { q: "Is Nagaland safe for tourists?", a: "Yes. Nagaland's tourist circuits are safe and the people are known for their hospitality. Follow local advice, respect village rules and carry your permits." },
    ],
  },
];

export const stateBySlug = (slug: StateSlug) => states.find((s) => s.slug === slug)!;
export const stateByPageSlug = (pageSlug: string) => states.find((s) => s.pageSlug === pageSlug);

import { Package } from "../types";

export const packages: Package[] = [
  {
    id: "classic-kaziranga",
    title: "Kaziranga National Park Tour",
    description:
      "Experience the magic of Kaziranga with our most popular package featuring jeep safaris, elephant rides, and cultural experiences.",
    duration: "3 Days / 2 Nights",
    highlights: [
      "Early morning elephant safari",
      "Jeep safari in all ranges",
      "Traditional Assamese dinner",
      "Tea garden visit",
      "Cultural dance performance",
    ],
    included: [
      "Accommodation",
      "All meals",
      "Safari permits",
      "Expert naturalist guide",
      "Transportation",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Evening Safari",
        description:
          "Arrive at resort, lunch, evening jeep safari in Central Range, welcome dinner",
      },
      {
        day: 2,
        title: "Full Day Safari Experience",
        description:
          "Early morning elephant safari, breakfast, jeep safari in Western Range, cultural evening",
      },
      {
        day: 3,
        title: "Tea Garden & Departure",
        description: "Morning tea garden visit, traditional lunch, departure",
      },
    ],
    image:
      "https://media.assettype.com/outlooktraveller%2F2023-10%2F5b58aa6a-cfcb-45a1-ad9f-5bad3b8984ee%2F106554149_744865456346625_1735154775456169959_n.jpg?w=1024&auto=format%2Ccompress&fit=max",
  },
  {
    id: "dehing-patkai-tour",
    title: "Dehing Patkai National Park tour",
    description:
      "Explore the pristine wilderness of Dihing Patkai National Park, home to lush rainforests, diverse wildlife, and rich biodiversity. Perfect for nature enthusiasts and adventure seekers",
    duration: "4 Days / 3 Nights",
    highlights: [
      "Guided treks through lush rainforests",
      "Birdwatching and wildlife spotting",
      "Scenic river cruise",
      "Visits to traditional tribal villages",
      "Exploration of rich biodiversity",
    ],
    included: [
      "Comfortable eco-friendly accommodation",
      "All meals featuring local cuisine",
      "Guided treks and safaris",
      "Expert naturalist guide",
      "All transportation within the tour",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Orientation",
        description:
          "Check-in at eco-lodge, tour briefing, and nature walk to explore the surroundings.",
      },
      {
        day: 2,
        title: "Rainforest Exploration",
        description:
          "Morning trek through the dense rainforest, wildlife spotting, and an evening river cruise.",
      },
      {
        day: 3,
        title: "Wildlife & Culture",
        description:
          "Morning birdwatching session, visit to tribal villages, and cultural exploration.",
      },
      {
        day: 4,
        title: "Final Trek & Departure",
        description:
          "Early morning trek, reflection session, and departure after breakfast.",
      },
    ],
    image:
      "https://i0.wp.com/naturesbeckon.org/wp-content/uploads/2020/08/dpwls.jpg?resize=1024%2C576&ssl=1",
  },
  {
    id: "dibru-saikhowa-tour",
    title: "Dibru Saikhowa National Park Tour",
    description:
      "Discover the diverse ecosystems of Dibru Saikhowa National Park, featuring unique wildlife, vibrant birdlife, and rich cultural heritage. Ideal for wildlife enthusiasts and nature explorers.",
    duration: "4 Days / 3 Nights",
    highlights: [
      "Rare feral horse sightings",
      "Birdwatching for exotic species",
      "Brahmaputra river scenic cruise",
      "Visits to tribal villages",
      "Explore Kekjori and Churkey",
    ],
    included: [
      "Comfortable eco-lodge accommodation",
      "All meals featuring local Assamese cuisine",
      "Guided wildlife safaris, birdwatching, and river cruises",
      "Expert naturalist and cultural guides",
      "All required permits and transportation within the tour",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Orientation",
        description:
          "Check-in at an eco-lodge near Guijan Ghat. Enjoy a sunset river cruise and orientation about Dibru Saikhowa’s biodiversity.",
      },
      {
        day: 2,
        title: "Birdwatching & Wildlife Safari",
        description:
          "Start with a sunrise birdwatching tour. After lunch, embark on a guided boat ride to explore the park's aquatic ecosystems and spot feral horses.",
      },
      {
        day: 3,
        title: "Cultural Exploration & Trekking",
        description:
          "Visit Laika and Dodhia villages to experience tribal lifestyles. In the afternoon, trek through the forest to discover unique flora like the Kekjori trees.",
      },
      {
        day: 4,
        title: "Final Exploration & Departure",
        description:
          "Take a morning safari focusing on river dolphins and bird species. Conclude with a photo review session before departing.",
      },
    ],
    image:
      "https://i.pinimg.com/736x/dc/f6/2f/dcf62f1587d38ac4c0afc8d1dcb2250b.jpg",
  },

  // ==================== NEW PACKAGES ====================

  {
    id: "tawang-tour",
    title: "Tawang Monastery & Himalayan Tour",
    description:
      "Discover India's largest monastery, high-altitude passes, glacial lakes, and the rich Monpa Buddhist culture in the breathtaking landscapes of Arunachal Pradesh.",
    duration: "5 Days / 4 Nights",
    highlights: [
      "Visit the iconic Tawang Monastery",
      "Drive across Sela Pass & Bumla Pass",
      "Boating at Madhuri Lake (Sangestar Tso)",
      "Monpa tribal villages & local cuisine",
      "Snow-capped Himalayan views",
    ],
    included: [
      "Comfortable hotel/guest-house accommodation",
      "All meals with local Monpa dishes",
      "Expert local guide & permits",
      "4x4 transportation",
      "Entrance fees to all sites",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Tawang",
        description:
          "Arrive from Tezpur/Guwahati, check-in, evening visit to Tawang Monastery.",
      },
      {
        day: 2,
        title: "Sela Pass & Madhuri Lake",
        description:
          "Full-day excursion to Sela Pass and Madhuri Lake with scenic stops.",
      },
      {
        day: 3,
        title: "Bumla Pass Excursion",
        description:
          "Drive to Bumla Pass (Indo-China border area) – subject to weather and permits.",
      },
      {
        day: 4,
        title: "Local Culture & Monasteries",
        description:
          "Visit smaller monasteries, war memorial, and Monpa villages.",
      },
      {
        day: 5,
        title: "Departure",
        description: "Morning free for shopping, then departure.",
      },
    ],
    image: "https://images.unsplash.com/photo-1628070018796-a9f4e2dd482a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "nagaland-tour",
    title: "Nagaland Tribal & Cultural Tour",
    description:
      "Immerse in the vibrant Naga tribal culture, traditional villages, war history, and scenic hills of Nagaland – the land of festivals and warriors.",
    duration: "5 Days / 4 Nights",
    highlights: [
      "Kohima War Cemetery & State Museum",
      "Traditional Naga villages & longhouses",
      "Naga tribal dances & local cuisine",
      "Hornbill Festival ground (seasonal)",
      "Scenic Naga hills & viewpoints",
    ],
    included: [
      "Hotel accommodation in Kohima & villages",
      "All meals featuring authentic Naga cuisine",
      "Local tribal guide",
      "Transportation",
      "Cultural permits",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Kohima",
        description:
          "Arrive, check-in, visit Kohima War Cemetery and State Museum.",
      },
      {
        day: 2,
        title: "Naga Village Exploration",
        description:
          "Full day visiting traditional villages like Khonoma or Dzukou Valley area.",
      },
      {
        day: 3,
        title: "Cultural Immersion",
        description:
          "Experience tribal dances, handicrafts, and local markets in Kohima.",
      },
      {
        day: 4,
        title: "Scenic Hills & Optional Trek",
        description:
          "Drive to scenic viewpoints or short trek in the surrounding hills.",
      },
      {
        day: 5,
        title: "Departure",
        description: "Morning free, then departure.",
      },
    ],
    image: "https://upload.wikimedia.org/wikipedia/commons/4/47/Hornbill_Festival.jpg",
  },
  {
    id: "anini-tour",
    title: "Anini & Dibang Valley Adventure",
    description:
      "Explore the remote and pristine Dibang Valley around Anini – home to Mishmi tribes, dense forests, and dramatic Himalayan foothills.",
    duration: "5 Days / 4 Nights",
    highlights: [
      "Mishmi tribal villages & culture",
      "Dibang Wildlife Sanctuary exploration",
      "Scenic drives through remote valleys",
      "Birdwatching & butterfly spotting",
      "Trekking in pristine Himalayan foothills",
    ],
    included: [
      "Eco-lodge / guest-house accommodation",
      "All meals with local Mishmi cuisine",
      "Expert local guide & permits",
      "4x4 transportation",
      "All entry fees",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Anini",
        description:
          "Arrive from Roing/Tezu, check-in, orientation and short village walk.",
      },
      {
        day: 2,
        title: "Dibang Valley Exploration",
        description:
          "Full-day drive and short treks in the valley with wildlife spotting.",
      },
      {
        day: 3,
        title: "Mishmi Culture Day",
        description:
          "Visit Mishmi villages, interact with locals, and learn traditional crafts.",
      },
      {
        day: 4,
        title: "Sanctuary & Nature Walk",
        description:
          "Guided walk in Dibang Wildlife Sanctuary area and scenic viewpoints.",
      },
      {
        day: 5,
        title: "Departure",
        description: "Morning free, then departure to Roing/Tezu.",
      },
    ],
    image: "https://northeastexplorers.in/wp-content/uploads/2023/10/Chigu-Camp-scaled.jpg",
  },
  {
    id: "cherrapunji-tour",
    title: "Cherrapunji Waterfalls & Caves Tour",
    description:
      "Experience the wettest place on Earth with majestic waterfalls, limestone caves, and living root bridges in Cherrapunji (Sohra), Meghalaya.",
    duration: "3 Days / 2 Nights",
    highlights: [
      "Nohkalikai Falls – the tallest plunge waterfall",
      "Seven Sisters Falls viewpoint",
      "Mawsmai & Krem Phyllut caves",
      "Living root bridges (nearby Mawlynnong)",
      "Rainforest walks & viewpoints",
    ],
    included: [
      "Eco-lodge accommodation in Cherrapunji",
      "All meals",
      "Local guide",
      "Transportation",
      "Entry fees & permits",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Nohkalikai",
        description:
          "Arrive from Shillong, check-in, visit Nohkalikai Falls and viewpoints.",
      },
      {
        day: 2,
        title: "Caves & Seven Sisters",
        description:
          "Full day exploring Mawsmai Cave and Seven Sisters Falls viewpoint.",
      },
      {
        day: 3,
        title: "Root Bridge & Departure",
        description:
          "Morning visit to nearby living root bridge area, then departure.",
      },
    ],
    image: "https://images.financialexpressdigital.com/2022/06/cherrapunji_waterfalls_759.jpg?quality=100",
  },
  {
    id: "meghalaya-tour",
    title: "Meghalaya Living Root Bridges Tour",
    description:
      "Discover the unique living root bridges, cleanest villages, misty hills, and rich Khasi culture of Meghalaya.",
    duration: "4 Days / 3 Nights",
    highlights: [
      "Famous living root bridges (Mawlynnong & others)",
      "Asia’s cleanest village – Mawlynnong",
      "Cloudy hill station views",
      "Khasi tribal culture & markets",
      "Short rainforest treks",
    ],
    included: [
      "Eco-friendly homestay / lodge accommodation",
      "All meals with local Khasi cuisine",
      "Local guide",
      "Transportation",
      "Entry fees",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Mawlynnong",
        description:
          "Arrive from Shillong, check-in, explore Asia’s cleanest village and root bridge.",
      },
      {
        day: 2,
        title: "Root Bridge Trek",
        description:
          "Full-day trek to the iconic double-decker living root bridge.",
      },
      {
        day: 3,
        title: "Surrounding Villages & Culture",
        description:
          "Visit nearby villages, Khasi markets, and cultural experiences.",
      },
      {
        day: 4,
        title: "Departure",
        description: "Morning free, then departure.",
      },
    ],
    image: "https://i.natgeofe.com/n/ace1e947-3cd7-41c7-9959-0a2c825dd0c2/school-boys-living-root-bridge-meghalaya-india.jpg",
  },
  {
    id: "dawki-tour",
    title: "Dawki Crystal River Tour",
    description:
      "Boat on the unbelievably clear Umngot River in Dawki and enjoy the turquoise waters and dramatic cliffs of Meghalaya.",
    duration: "3 Days / 2 Nights",
    highlights: [
      "Boating on the crystal-clear Umngot River",
      "Stunning cliff and mountain scenery",
      "Living root bridges nearby",
      "Border area views (Indo-Bangladesh)",
      "Peaceful riverside relaxation",
    ],
    included: [
      "Riverside cottage / homestay accommodation",
      "All meals",
      "Local boat guide",
      "Transportation",
      "Boat ride charges",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & River Cruise",
        description:
          "Arrive from Shillong, check-in, sunset boat ride on Umngot River.",
      },
      {
        day: 2,
        title: "Full Day on the River",
        description:
          "Morning and afternoon boating, explore nearby root bridges and cliffs.",
      },
      {
        day: 3,
        title: "Morning Boat & Departure",
        description:
          "Early morning boat ride, then departure after breakfast.",
      },
    ],
    image: "	https://backpackersunited.in/_next/image?url=https…70_amit-jain-FYGEA9aezAw-unsplash.jpg&w=1920&q=75",
  },
  {
    id: "shillong-tour",
    title: "Shillong Hill Station Tour",
    description:
      "Explore the ‘Scotland of the East’ – Shillong with its lakes, waterfalls, pine forests, and vibrant markets in Meghalaya.",
    duration: "3 Days / 2 Nights",
    highlights: [
      "Ward’s Lake & Lady Hydari Park",
      "Elephant Falls",
      "Shillong Peak panoramic views",
      "Local markets & pine forests",
      "Don Bosco Museum (optional)",
    ],
    included: [
      "Hotel accommodation in Shillong",
      "All meals",
      "Local guide",
      "Transportation",
      "Entry fees",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & City Tour",
        description:
          "Arrive, check-in, visit Ward’s Lake, Lady Hydari Park, and local market.",
      },
      {
        day: 2,
        title: "Waterfalls & Peak",
        description:
          "Full day – Elephant Falls, Shillong Peak, and pine forest drive.",
      },
      {
        day: 3,
        title: "Morning Free & Departure",
        description:
          "Morning free for shopping or optional museum, then departure.",
      },
    ],
    image: "https://www.nielit.gov.in/sites/default/files/Shillong/s1.jpg",
  },
];

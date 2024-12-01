import { Package } from "../types";

export const packages: Package[] = [
  {
    id: "classic-kaziranga",
    title: "Premium Kaziranga Tour",
    description:
      "Experience the magic of Kaziranga with our most popular package featuring jeep safaris, elephant rides, and cultural experiences.",
    duration: "3 Days / 2 Nights",
    price: {
      budget: 12999,
      premium: 19999,
      luxury: 29999,
    },
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
    id: "deehing-patkai-tour",
    title: "Deehing patkai tour",
    description:
      "Explore the pristine wilderness of Dihing Patkai National Park, home to lush rainforests, diverse wildlife, and rich biodiversity. Perfect for nature enthusiasts and adventure seekers",
    duration: "4 Days / 3 Nights",
    price: {
      budget: 19999,
      premium: 29999,
      luxury: 39999,
    },
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
    price: {
      budget: 19999,
      premium: 29999,
      luxury: 39999,
    },
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
];

export interface Package {
  id: string;
  title: string;
  description: string;
  duration: string;
  price: {
    budget: number;
    premium: number;
    luxury: number;
  };
  highlights: string[];
  included: string[];
  itinerary: {
    day: number;
    title: string;
    description: string;
  }[];
  image: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  package: string;
  avatar: string;
}
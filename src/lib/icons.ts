/**
 * Single icon mapping config for the whole site (lucide-react).
 * Data files reference icons by key; components resolve them here.
 */
import {
  Award, Bed, Binoculars, Bird, BookOpen, Building2, Bus, Cable, Calendar, Camera, Car, Castle, Check,
  CloudRain, Coffee, Compass, Droplets, FileCheck, Fish, Flashlight, Flower2, Footprints, Gauge, Heart, Hotel,
  IndianRupee, Landmark, Leaf, Map, MapPin, Mountain, MountainSnow, Music, Palette, PartyPopper, Plane,
  Route, Sailboat, Scissors, ShieldCheck, Ship, Snowflake, Sparkles, Sprout, Sun, Sunrise, Tent, Ticket,
  Timer, TrainFront, TreePine, Trees, Users, Utensils, Waves, X, type LucideIcon,
} from "lucide-react";

export const icons = {
  // activity types
  safari: Binoculars,
  trekking: Mountain,
  rafting: Waves,
  boat: Sailboat,
  cruise: Ship,
  camping: Tent,
  monastery: Landmark,
  temple: Landmark,
  heritage: Castle,
  tea: Leaf,
  birdwatching: Bird,
  festival: PartyPopper,
  music: Music,
  food: Utensils,
  waterfall: Droplets,
  lake: Waves,
  cave: Flashlight,
  forest: Trees,
  wildlife: Binoculars,
  village: Users,
  culture: Palette,
  craft: Scissors,
  weaving: Sparkles,
  angling: Fish,
  snow: MountainSnow,
  pass: MountainSnow,
  hotspring: Droplets,
  zipline: Cable,
  viewpoint: Camera,
  sunrise: Sunrise,
  bridge: Route,
  history: BookOpen,
  memorial: Award,
  city: Building2,
  garden: Flower2,
  nature: TreePine,
  island: Sprout,
  walk: Footprints,
  coffee: Coffee,
  // logistics
  hotel: Bed,
  stay: Hotel,
  transport: Car,
  bus: Bus,
  flight: Plane,
  train: TrainFront,
  meals: Utensils,
  guide: Compass,
  permit: FileCheck,
  ticket: Ticket,
  safety: ShieldCheck,
  price: IndianRupee,
  // info panel
  season: Calendar,
  sun: Sun,
  rain: CloudRain,
  winter: Snowflake,
  duration: Timer,
  difficulty: Gauge,
  altitude: Mountain,
  location: MapPin,
  map: Map,
  route: Route,
  people: Users,
  love: Heart,
  include: Check,
  exclude: X,
  arrival: Plane,
  departure: Plane,
  drive: Car,
} satisfies Record<string, LucideIcon>;

export type IconKey = keyof typeof icons;

export function getIcon(key: IconKey | string | undefined): LucideIcon {
  return (key && (icons as Record<string, LucideIcon>)[key]) || MapPin;
}

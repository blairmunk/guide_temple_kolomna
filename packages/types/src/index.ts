export interface Location {
  lat: number;
  lng: number;
  elev?: number;
}

export interface LocalizedText {
  ru: string;
  en?: string;
}

export interface MediaItem {
  id: string;
  type: 'photo' | 'audio' | 'video' | 'panorama360';
  url: string;
  thumbnail?: string;
  width?: number;
  height?: number;
  durationSec?: number;
  alt?: LocalizedText;
  lang?: string;
}

export interface POI {
  id: string;
  slug: string;
  title: LocalizedText;
  summary?: LocalizedText;
  body?: LocalizedText;
  location: Location;
  era?: string;
  style?: string;
  architect?: string;
  media: MediaItem[];
  tags: string[];
  categories: string[];
  visitTimeMin: number;
  accessibility: {
    mgn: boolean;
    stroller: boolean;
  };
  hours?: string;
  createdAt: string;
  updatedAt: string;
}

export interface RoutePoint {
  poiId: string;
  order: number;
  etaMin: number;
}

export interface Route {
  id: string;
  title: LocalizedText;
  description?: LocalizedText;
  points: RoutePoint[];
  lengthKm: number;
  durationMin: number;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
}

export interface Event {
  id: string;
  title: LocalizedText;
  dateStart: string;
  dateEnd?: string;
  poiId?: string;
  lang: string[];
  price: number;
}

export interface OfflineManifest {
  version: string;
  region: string;
  lang: string;
  poi: string[];
  media: string[];
  tiles?: string[];
  checksums: Record<string, string>;
}

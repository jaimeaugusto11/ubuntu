// ================================
// types.ts
// ================================
export type Provider = {
  id: string;
  name: string;
  avatar?: string;
  rating: number;
  reviews: number;
  city: string;
  distanceKm?: number;
  priceFrom: number;
  specialties: string[];
  portfolio?: { title: string; img: string }[];
};

export type Service = {
  id: string;
  title: string;
  providerId: string;
  estDelivery: string;
  tags: string[];
  img?: string; // ignorado/placeholder
};
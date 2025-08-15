// ================================
// data/index.ts
// ================================
import type { Provider, Service } from "../components/portofolio/types";

export const PROVIDERS: Provider[] = [
  { id: "p1", name: "Studio Clean", rating: 4.8, reviews: 312, city: "Luanda", distanceKm: 3.2, priceFrom: 3500, specialties: ["Limpeza residencial", "Pós-obra"], portfolio: [{ title: "Apartamento T2", img: "" }, { title: "Escritório 120m²", img: "" }] },
  { id: "p2", name: "TecFix Assistência", rating: 4.6, reviews: 198, city: "Luanda", distanceKm: 6.1, priceFrom: 8000, specialties: ["Reparação de eletrodomésticos", "Instalações"] },
  { id: "p3", name: "Design&Web Pro", rating: 4.9, reviews: 540, city: "Talatona", distanceKm: 9.5, priceFrom: 25000, specialties: ["Websites", "Branding"] },
];

export const SERVICES: Service[] = [
  { id: "s1", title: "Limpeza residencial — pacote semanal", providerId: "p1", estDelivery: "Jun 23 – Jun 24", tags: ["limpeza", "residencial"] },
  { id: "s2", title: "Instalação de fogão / exaustor", providerId: "p2", estDelivery: "Amanhã", tags: ["reparação", "instalação"] },
  { id: "s3", title: "Website institucional (até 6 páginas)", providerId: "p3", estDelivery: "Jul 2", tags: ["website", "design"] },
  { id: "s4", title: "Identidade visual completa", providerId: "p3", estDelivery: "Aug 14 – Aug 15", tags: ["branding", "design"] },
];
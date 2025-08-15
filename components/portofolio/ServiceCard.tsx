// ================================
// components/ServiceCard.tsx
// ================================
"use client";
import {
  Calendar,
  MapPin,
  Star,
  User,
  MessageSquare,
  CreditCard,
  FileWarning,
} from "lucide-react";
import type { Provider, Service } from "./types";
import { currency } from "../../utils/currency";

type ModalKey =
  | "quote"
  | "chat"
  | "pay"
  | "track"
  | "rate"
  | "complain"
  | "provider";

export default function ServiceCard({
  s,
  p,
  onOpen,
}: {
  s: Service;
  p: Provider;
  onOpen: (which: ModalKey) => void;
}) {
  return (
    <div className="relative rounded-xl p-3 bg-white/80 backdrop-blur shadow-md border border-white/60 hover:shadow-lg hover:-translate-y-0.5 transition-all">
  <div className="w-full h-24 rounded-lg bg-gradient-to-br from-indigo-50 via-white to-purple-50 grid place-items-center text-[11px] text-gray-500 mb-2">
    pré-visualização
  </div>

  <h3 className="font-semibold text-gray-900 text-xs line-clamp-2">
    {s.title}
  </h3>

  <div className="mt-1 flex items-center justify-between">
    <button
      onClick={() => onOpen("provider")}
      className="text-[11px] text-blue-600 hover:underline inline-flex items-center gap-1"
    >
      <User size={12} /> {p.name}
    </button>
    <p className="text-sm font-extrabold text-gray-900">
      {currency(p.priceFrom)}
    </p>
  </div>

  <div className="mt-1.5 flex flex-wrap gap-1.5">
    <span className="inline-flex items-center text-[10px] bg-white px-1.5 py-0.5 rounded-lg border">
      <MapPin size={11} className="mr-1" /> {p.city}
      {p.distanceKm ? ` • ${p.distanceKm}km` : ""}
    </span>
    <span className="inline-flex items-center text-[10px] bg-white px-1.5 py-0.5 rounded-lg border">
      <Star size={11} className="mr-1" /> {p.rating} ({p.reviews})
    </span>
  </div>

  <div className="mt-2 grid grid-cols-3 gap-1.5">
    <button
      onClick={() => onOpen("quote")}
      className="col-span-2 w-full bg-gray-900 text-white py-1.5 rounded-lg text-[11px] hover:bg-black"
    >
      Solicitar orçamento
    </button>
    <button
      onClick={() => onOpen("chat")}
      className="w-full border border-gray-300 py-1.5 rounded-lg text-[11px] hover:bg-gray-50 inline-flex items-center justify-center gap-1"
    >
      <MessageSquare size={12} /> Chat
    </button>
  </div>

  <div className="mt-1.5 grid grid-cols-3 gap-1.5">
    <button
      onClick={() => onOpen("pay")}
      className="w-full bg-blue-600 text-white py-1.5 rounded-lg text-[11px] hover:bg-blue-700 inline-flex items-center justify-center gap-1"
    >
      <CreditCard size={12} /> Pagar
    </button>
    <button
      onClick={() => onOpen("track")}
      className="w-full border border-gray-300 py-1.5 rounded-lg text-[11px] hover:bg-gray-50"
    >
      Acompanhar
    </button>
    <button
      onClick={() => onOpen("rate")}
      className="w-full border border-gray-300 py-1.5 rounded-lg text-[11px] hover:bg-gray-50"
    >
      Avaliar
    </button>
  </div>

  <button
    onClick={() => onOpen("complain")}
    className="mt-1.5 w-full text-[11px] text-red-600 hover:text-red-700 inline-flex items-center justify-center gap-1"
  >
    <FileWarning size={12} /> Reclamar via Mediador
  </button>

  <div className="mt-2 flex items-center text-gray-500 text-[10px]">
    <Calendar size={12} className="mr-1" /> Estimativa{" "}
    <span className="ml-1 font-medium text-gray-700">{s.estDelivery}</span>
  </div>
</div>

  );
}

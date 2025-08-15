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
    <div className="relative rounded-2xl p-4 bg-white/80 backdrop-blur shadow-xl border border-white/60 hover:shadow-2xl hover:-translate-y-1 transition-all">
      <div className="w-full h-28 rounded-xl bg-gradient-to-br from-indigo-50 via-white to-purple-50 grid place-items-center text-xs text-gray-500 mb-3">
        pré-visualização
      </div>

      <h3 className="font-semibold text-gray-900 text-sm line-clamp-2">
        {s.title}
      </h3>
      <div className="mt-1 flex items-center justify-between">
        <button
          onClick={() => onOpen("provider")}
          className="text-xs text-blue-600 hover:underline inline-flex items-center gap-1"
        >
          <User size={14} /> {p.name}
        </button>
        <p className="text-base font-extrabold text-gray-900">
          {currency(p.priceFrom)}
        </p>
      </div>

      <div className="mt-2 flex flex-wrap gap-2">
        <span className="inline-flex items-center text-[11px] bg-white px-2 py-1 rounded-xl border">
          <MapPin size={12} className="mr-1" /> {p.city}
          {p.distanceKm ? ` • ${p.distanceKm}km` : ""}
        </span>
        <span className="inline-flex items-center text-[11px] bg-white px-2 py-1 rounded-xl border">
          <Star size={12} className="mr-1" /> {p.rating} ({p.reviews})
        </span>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2">
        <button
          onClick={() => onOpen("quote")}
          className="col-span-2 w-full bg-gray-900 text-white py-2 rounded-xl text-sm hover:bg-black"
        >
          Solicitar orçamento
        </button>
        <button
          onClick={() => onOpen("chat")}
          className="w-full border border-gray-300 py-2 rounded-xl text-sm hover:bg-gray-50 inline-flex items-center justify-center gap-2"
        >
          <MessageSquare size={14} /> Chat
        </button>
      </div>

      <div className="mt-2 grid grid-cols-3 gap-2">
        <button
          onClick={() => onOpen("pay")}
          className="w-full bg-blue-600 text-white py-2 rounded-xl text-sm hover:bg-blue-700 inline-flex items-center justify-center gap-2"
        >
          <CreditCard size={14} /> Pagar
        </button>
        <button
          onClick={() => onOpen("track")}
          className="w-full border border-gray-300 py-2 rounded-xl text-sm hover:bg-gray-50"
        >
          Acompanhar
        </button>
        <button
          onClick={() => onOpen("rate")}
          className="w-full border border-gray-300 py-2 rounded-xl text-sm hover:bg-gray-50"
        >
          Avaliar
        </button>
      </div>

      <button
        onClick={() => onOpen("complain")}
        className="mt-2 w-full text-[13px] text-red-600 hover:text-red-700 inline-flex items-center justify-center gap-2"
      >
        <FileWarning size={14} /> Reclamar via Mediador
      </button>

      <div className="mt-3 flex items-center text-gray-500 text-[12px]">
        <Calendar size={14} className="mr-2" /> Estimativa{" "}
        <span className="ml-1 font-medium text-gray-700">{s.estDelivery}</span>
      </div>
    </div>
  );
}

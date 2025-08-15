/* eslint-disable react-hooks/rules-of-hooks */
// ================================
// app/(privado)/servicos/page.tsx
// ================================
"use client";
import { useMemo, useState } from "react";
import { SortAsc, Send, Star } from "lucide-react";
import ServiceCard from "@/components/portofolio/ServiceCard";
import Modal from "@/components/portofolio/Modal";
import { Provider } from "@/components/portofolio";
import { Service } from "@/components/portofolio/types";
import { PROVIDERS, SERVICES } from "@/data";
import { currency } from "@/utils/currency";


// Esta página deve ocupar a página **toda** (full width/height)
// Use layout com w-screen/min-h-screen e sem container estreito

type ModalKey = null | "quote" | "chat" | "pay" | "track" | "rate" | "complain" | "provider";

export default function ServicosPage() {
  
  const [q, setQ] = useState("");
  const [city, setCity] = useState("Todas");
  const [minRating, setMinRating] = useState(0);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200000]);
  const [tag, setTag] = useState("Todos");
  const [sortAsc, setSortAsc] = useState(true);

  const [activeService, setActiveService] = useState<Service | null>(null);
  const [activeProvider, setActiveProvider] = useState<Provider | null>(null);
  const [modal, setModal] = useState<ModalKey>(null);

  const providersById = useMemo(() => new Map(PROVIDERS.map(p => [p.id, p])), []);

  const servicesFiltered = useMemo(() => {
    return SERVICES.filter((s) => {
      const prov = providersById.get(s.providerId)!;
      const text = q.trim().toLowerCase();
      const matchText = !text || s.title.toLowerCase().includes(text) || prov.name.toLowerCase().includes(text) || prov.specialties.some((sp: string) => sp.toLowerCase().includes(text));
      const matchCity = city === "Todas" || prov.city === city;
      const matchRating = prov.rating >= minRating;
      const matchTag = tag === "Todos" || s.tags.includes(tag.toLowerCase());
      const matchPrice = prov.priceFrom >= priceRange[0] && prov.priceFrom <= priceRange[1];
      return matchText && matchCity && matchRating && matchTag && matchPrice;
    }).sort((a, b) => {
      const pa = providersById.get(a.providerId)!.priceFrom;
      const pb = providersById.get(b.providerId)!.priceFrom;
      return sortAsc ? pa - pb : pb - pa;
    });
  }, [q, city, minRating, tag, priceRange, sortAsc, providersById]);

  const openAction = (s: Service, p: Provider, which: Exclude<ModalKey, null>) => {
    setActiveService(s);
    setActiveProvider(p);
    setModal(which);
  };

  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Encontre o serviço ideal</h1>
          <button onClick={() => setSortAsc((s) => !s)} className="inline-flex items-center gap-2 border border-gray-300 bg-white/80 px-4 py-2 rounded-xl shadow-sm hover:shadow-md hover:bg-white transition">
            <SortAsc size={18} /> Ordenar por preço {sortAsc ? "↑" : "↓"}
          </button>
        </div>

        <div className="grid grid-cols-12 gap-4 lg:gap-6">
          {/* Sidebar */}
          <aside className="col-span-12 lg:col-span-3 bg-white/70 backdrop-blur rounded-2xl shadow-xl border border-white/60 p-5 h-fit">
            <h2 className="font-semibold text-lg mb-4">Busca avançada</h2>

            <div className="relative mb-4">
              <input value={q} onChange={(e) => setQ(e.target.value)} type="text" placeholder="Serviço, prestador, especialidade..." className="w-full border border-gray-200 bg-gray-50 pl-3 pr-3 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <select value={city} onChange={(e) => setCity(e.target.value)} className="border border-gray-200 bg-gray-50 px-3 py-2.5 rounded-xl">
                <option>Todas</option>
                <option>Luanda</option>
                <option>Talatona</option>
              </select>
              <select value={tag} onChange={(e) => setTag(e.target.value)} className="border border-gray-200 bg-gray-50 px-3 py-2.5 rounded-xl">
                <option>Todos</option>
                <option value="limpeza">Limpeza</option>
                <option value="reparação">Reparação</option>
                <option value="website">Website</option>
                <option value="branding">Branding</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="text-sm text-gray-600">Avaliação mínima</label>
              <input type="range" min={0} max={5} step={0.5} value={minRating} onChange={(e) => setMinRating(parseFloat(e.target.value))} className="w-full" />
              <div className="text-sm text-gray-700">{minRating.toFixed(1)} ★</div>
            </div>

            <div className="mb-6">
              <label className="text-sm text-gray-600">Preço (A partir de)</label>
              <div className="flex gap-2">
                <input type="number" value={priceRange[0]} onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])} className="w-full border border-gray-200 bg-gray-50 px-3 py-2.5 rounded-xl" placeholder="Mín." />
                <input type="number" value={priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])} className="w-full border border-gray-200 bg-gray-50 px-3 py-2.5 rounded-xl" placeholder="Máx." />
              </div>
            </div>

            <div className="space-y-3">
              {["Entrega", "Método de pagamento", "Condição", "Peso"].map((f) => (
                <div key={f} className="border-t pt-3">
                  <button className="w-full flex justify-between items-center text-left font-medium text-gray-700">
                    {f} <span className="text-gray-500">▾</span>
                  </button>
                </div>
              ))}
            </div>
          </aside>

          {/* Lista */}
          <section className="col-span-12 lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {servicesFiltered.map((s) => {
              const p = providersById.get(s.providerId)!;
              const onOpen = (which: Exclude<ModalKey, null>) => openAction(s, p, which);
              return <ServiceCard key={s.id} s={s} p={p} onOpen={onOpen} />;
            })}
          </section>
        </div>
      </div>

      {/* Modais reutilizadas aqui (para manter estado centralizado) */}
      <Modal open={modal === "quote" && !!activeService && !!activeProvider} onClose={() => setModal(null)} title={`Solicitar orçamento — ${activeService?.title}`} actions={<><button onClick={() => setModal(null)} className="px-4 py-2 rounded-xl border">Cancelar</button><button onClick={() => setModal(null)} className="px-4 py-2 rounded-xl bg-blue-600 text-white">Enviar pedido</button></>}>
        <div className="space-y-3">
          <div className="text-sm text-gray-600">Prestador: <span className="font-medium text-gray-800">{activeProvider?.name}</span></div>
          <textarea className="w-full border rounded-xl p-3" rows={4} placeholder="Descreva o serviço, datas, materiais, local, etc." />
          <div className="grid grid-cols-2 gap-3">
            <input className="border rounded-xl px-3 py-2.5" placeholder="Localização" />
            <input type="date" className="border rounded-xl px-3 py-2.5" />
          </div>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" className="accent-blue-600" /> Permite mediação desde o início</label>
        </div>
      </Modal>

      <Modal open={modal === "chat" && !!activeService} onClose={() => setModal(null)} title={`Chat — ${activeProvider?.name}`} actions={<button className="px-4 py-2 rounded-xl bg-blue-600 text-white inline-flex items-center gap-2"><Send size={16} /> Enviar</button>} maxWidth="max-w-2xl">
        <div className="h-72 border rounded-xl p-3 bg-gray-50 mb-3 overflow-auto text-sm text-gray-700">
          <div><b>Mediador:</b> Olá! Como posso ajudar?</div>
          <div className="mt-2"><b>{activeProvider?.name}:</b> Posso atender esta semana.</div>
        </div>
        <input className="w-full border rounded-xl px-3 py-2.5" placeholder="Digite a sua mensagem..." />
        <label className="mt-3 flex items-center gap-2 text-sm"><input type="checkbox" className="accent-blue-600" /> Incluir mediador nesta conversa</label>
      </Modal>

      <Modal open={modal === "pay" && !!activeService} onClose={() => setModal(null)} title="Pagamento" actions={<><button onClick={() => setModal(null)} className="px-4 py-2 rounded-xl border">Cancelar</button><button onClick={() => setModal(null)} className="px-4 py-2 rounded-xl bg-blue-600 text-white">Pagar agora</button></>}>
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button className="border rounded-xl p-3 text-left hover:bg-gray-50"><div className="font-medium">Express</div><div className="text-xs text-gray-500">Cartão/Carteira</div></button>
            <button className="border rounded-xl p-3 text-left hover:bg-gray-50"><div className="font-medium">Transferência</div><div className="text-xs text-gray-500">IBAN/Comprovativo</div></button>
            <button className="border rounded-xl p-3 text-left hover:bg-gray-50"><div className="font-medium">Pagamento por referência</div><div className="text-xs text-gray-500">Multicaixa/Ref.</div></button>
          </div>
          <input className="w-full border rounded-xl px-3 py-2.5" placeholder="Valor (AOA)" defaultValue={activeProvider ? activeProvider.priceFrom : ""} />
        </div>
      </Modal>

      <Modal open={modal === "track" && !!activeService} onClose={() => setModal(null)} title="Acompanhar status do serviço">
        <ol className="relative border-s-2 border-blue-200 ps-5 space-y-4 text-sm">
          <li>
            <div className="absolute -left-[9px] w-4 h-4 rounded-full bg-blue-600" />
            Pedido criado
            <div className="text-gray-500">Recebemos o seu pedido e estamos a confirmar detalhes.</div>
          </li>
          <li>
            <div className="absolute -left-[9px] mt-6 w-4 h-4 rounded-full bg-blue-600" />
            Prestador atribuído
            <div className="text-gray-500">Mediador confirmou {activeProvider?.name}.</div>
          </li>
          <li>
            <div className="absolute -left-[9px] mt-12 w-4 h-4 rounded-full bg-gray-300" />
            Em execução
          </li>
          <li>
            <div className="absolute -left-[9px] mt-[72px] w-4 h-4 rounded-full bg-gray-300" />
            Concluído & Avaliação
          </li>
        </ol>
      </Modal>

      <Modal open={modal === "rate" && !!activeService} onClose={() => setModal(null)} title={`Avaliar — ${activeProvider?.name}`} actions={<><button onClick={() => setModal(null)} className="px-4 py-2 rounded-xl border">Cancelar</button><button onClick={() => setModal(null)} className="px-4 py-2 rounded-xl bg-blue-600 text-white">Enviar avaliação</button></>}>
        <div className="space-y-3">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <button key={n} className="p-2"><Star size={20} className="text-yellow-500 fill-yellow-500" /></button>
            ))}
          </div>
          <textarea className="w-full border rounded-xl p-3" rows={4} placeholder="Deixe o seu feedback para ajudar outros clientes" />
        </div>
      </Modal>

      <Modal open={modal === "complain" && !!activeService} onClose={() => setModal(null)} title="Reclamação formal via mediador" actions={<><button onClick={() => setModal(null)} className="px-4 py-2 rounded-xl border">Cancelar</button><button onClick={() => setModal(null)} className="px-4 py-2 rounded-xl bg-red-600 text-white">Enviar reclamação</button></>}>
        <div className="space-y-3">
          <div className="text-sm text-gray-600">Serviço: <span className="font-medium text-gray-800">{activeService?.title}</span></div>
          <select className="w-full border rounded-xl px-3 py-2.5">
            <option>Qualidade abaixo do esperado</option>
            <option>Atraso</option>
            <option>Valor cobrado indevido</option>
            <option>Outro</option>
          </select>
          <textarea className="w-full border rounded-xl p-3" rows={4} placeholder="Descreva o ocorrido com detalhes" />
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" className="accent-blue-600" /> Enviar cópia ao prestador</label>
        </div>
      </Modal>

      <Modal open={modal === "provider" && !!activeProvider} onClose={() => setModal(null)} title={`Perfil — ${activeProvider?.name}`} maxWidth="max-w-3xl">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <div className="text-sm text-gray-600 mb-2"><span className="inline-block mr-1">★</span> {activeProvider?.rating} ({activeProvider?.reviews}) • {activeProvider?.city}</div>
            <div className="space-y-1">
              <div className="font-medium">Especialidades</div>
              <div className="flex flex-wrap gap-2">
                {activeProvider?.specialties.map((s) => (
                  <span key={s} className="text-xs bg-white px-2 py-1 rounded-xl border">{s}</span>
                ))}
              </div>
            </div>
            <div className="mt-4">
              <div className="font-medium">Preço base</div>
              <div className="text-lg font-extrabold">{currency(activeProvider?.priceFrom ?? 0)}</div>
            </div>
          </div>
          <div>
            <div className="font-medium mb-2">Portefólio</div>
            <div className="grid grid-cols-2 gap-3">
              {(activeProvider?.portfolio ?? [{ title: "Trabalho A", img: "" }, { title: "Trabalho B", img: "" }]).map((item, i) => (
                <div key={i} className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl h-24 grid place-items-center text-xs text-gray-500">
                  {item.title}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-5 flex gap-2">
          {activeService && <button onClick={() => openAction(activeService, activeProvider!, "quote")} className="border px-4 py-2 rounded-xl">Solicitar orçamento</button>}
          {activeService && <button onClick={() => openAction(activeService, activeProvider!, "chat")} className="border px-4 py-2 rounded-xl">Chat</button>}
        </div>
      </Modal>
    </div>
  );
}

// ================================
// middleware.ts (exemplo)
// ================================
// export { default } from "next-auth/middleware";
// export const config = { matcher: ["/servicos/:path*"] };

"use client";
import { X } from "lucide-react";

export default function Modal({ open, onClose, title, children, actions, maxWidth = "max-w-lg" }: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  maxWidth?: string;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className={`w-full ${maxWidth} bg-white/90 rounded-2xl shadow-2xl border border-white/60`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-100/70">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800">{title}</h3>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100">
            <X size={18} />
          </button>
        </div>
        <div className="p-4">{children}</div>
        {actions && <div className="p-4 border-t border-gray-100/70 flex gap-3 justify-end">{actions}</div>}
      </div>
    </div>
  );
}
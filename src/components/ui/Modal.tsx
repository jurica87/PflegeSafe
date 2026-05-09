import type { ReactNode } from 'react';
import { Button } from './Button';

export function Modal({ open, title, children, onClose }: { open: boolean; title: string; children: ReactNode; onClose: () => void }) {
  if (!open) return null;
  return <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/40 p-4">
    <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl">
      <div className="mb-4 flex items-center justify-between"><h2 className="text-xl font-bold">{title}</h2><Button variant="ghost" onClick={onClose}>Schließen</Button></div>
      {children}
    </div>
  </div>;
}

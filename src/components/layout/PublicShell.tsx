import type { ReactNode } from 'react';
import { ShieldCheck } from 'lucide-react';

export function PublicShell({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-gradient-to-br from-care-50 via-white to-slate-100">
    <header className="border-b border-slate-200 bg-white/90"><div className="mx-auto flex max-w-5xl items-center gap-2 px-4 py-4 font-bold text-care-700"><ShieldCheck /> PflegeSafe QualiPass</div></header>
    <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
  </div>;
}

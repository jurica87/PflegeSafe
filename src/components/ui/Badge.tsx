import type { ReactNode } from 'react';

export function Badge({ children, tone = 'slate' }: { children: ReactNode; tone?: 'slate' | 'blue' | 'green' | 'amber' | 'red' }) {
  const tones = {
    slate: 'bg-slate-100 text-slate-700',
    blue: 'bg-care-100 text-care-700',
    green: 'bg-emerald-100 text-emerald-700',
    amber: 'bg-amber-100 text-amber-800',
    red: 'bg-red-100 text-red-700',
  };
  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${tones[tone]}`}>{children}</span>;
}

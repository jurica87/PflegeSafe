import type { SelectHTMLAttributes } from 'react';

export function Select({ className = '', children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={`focus-ring w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-900 ${className}`} {...props}>{children}</select>;
}

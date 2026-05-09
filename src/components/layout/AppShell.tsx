import type { ReactNode } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import { logout } from '../../lib/auth';
import { Button } from '../ui/Button';

const nav = [
  ['Dashboard', '/dashboard'], ['Profil', '/onboarding'], ['Examen', '/exam'], ['Nachweise', '/documents'], ['Upload', '/documents/new'], ['QualiPass', '/qualipass'], ['Freigaben', '/share-links'], ['Account', '/account']
];

export function AppShell({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  return <div className="min-h-screen bg-gradient-to-br from-care-50 via-white to-slate-100">
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <NavLink to="/dashboard" className="flex items-center gap-2 font-bold text-care-700"><ShieldCheck /> PflegeSafe</NavLink>
        <Button variant="ghost" onClick={async () => { await logout(); navigate('/login'); }}>Logout</Button>
      </div>
      <nav className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 pb-3 text-sm">
        {nav.map(([label, href]) => <NavLink key={href} to={href} className={({ isActive }) => `rounded-full px-3 py-1.5 font-medium ${isActive ? 'bg-care-600 text-white' : 'bg-white text-slate-600 hover:bg-care-50'}`}>{label}</NavLink>)}
        <NavLink to="/admin" className="rounded-full px-3 py-1.5 font-medium text-slate-600 hover:bg-care-50">Admin</NavLink>
      </nav>
    </header>
    <main className="mx-auto max-w-7xl px-4 py-8">{children}</main>
  </div>;
}

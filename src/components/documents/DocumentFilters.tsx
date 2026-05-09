import type { DocumentFilters as Filters } from '../../types/document';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';

export function DocumentFilters({ value, onChange }: { value: Filters; onChange: (filters: Filters) => void }) {
  return <div className="grid gap-3 rounded-3xl border border-slate-200 bg-white p-4 md:grid-cols-4">
    <Input placeholder="Suchen" value={value.search ?? ''} onChange={(e) => onChange({ ...value, search: e.target.value })} />
    <Select value={value.visibility ?? 'all'} onChange={(e) => onChange({ ...value, visibility: e.target.value as Filters['visibility'] })}><option value="all">Alle Sichtbarkeiten</option><option value="private">Privat</option><option value="public">Öffentlich</option><option value="share_link">Freigabelink</option></Select>
    <Select value={value.verification_status ?? 'all'} onChange={(e) => onChange({ ...value, verification_status: e.target.value as Filters['verification_status'] })}><option value="all">Alle Prüfstatus</option><option value="self_declared">Selbst angegeben</option><option value="submitted">Eingereicht</option><option value="verified">Geprüft</option></Select>
    <Select value={value.sortBy ?? 'created_at'} onChange={(e) => onChange({ ...value, sortBy: e.target.value as Filters['sortBy'] })}><option value="created_at">Upload-Datum</option><option value="expiry_date">Ablaufdatum</option><option value="title">Titel</option></Select>
  </div>;
}

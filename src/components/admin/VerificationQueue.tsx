import { Button } from '../ui/Button';

export function VerificationQueue({ rows, kind, onVerify }: { rows: Array<Record<string, unknown>>; kind: 'exam' | 'document'; onVerify: (kind: 'exam' | 'document', id: string, status: 'verified' | 'rejected') => void }) {
  return <div className="space-y-3">{rows.map((row) => <div key={String(row.id)} className="rounded-2xl border border-slate-200 bg-white p-4"><div className="flex flex-wrap items-center justify-between gap-3"><div><p className="font-semibold">{String(row.title ?? row.professional_title ?? 'Nachweis')}</p><p className="text-sm text-slate-600">{String(row.user_id)}</p></div><div className="flex gap-2"><Button variant="secondary" onClick={() => onVerify(kind, String(row.id), 'verified')}>Prüfen</Button><Button variant="danger" onClick={() => onVerify(kind, String(row.id), 'rejected')}>Ablehnen</Button></div></div></div>)}</div>;
}

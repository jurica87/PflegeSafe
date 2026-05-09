import type { FormEvent } from 'react';
import { useState } from 'react';
import { createDocument, type DocumentInput } from '../../lib/documents';
import { validateEvidenceFile } from '../../utils/fileChecks';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { TagInput } from '../ui/TagInput';
import { FileUpload } from './FileUpload';

export function DocumentForm({ onCreated }: { onCreated?: () => void }) {
  const [tags, setTags] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const [form, setForm] = useState<DocumentInput>({ title: '', document_type: '', visibility: 'private' });
  async function submit(event: FormEvent) {
    event.preventDefault();
    if (file) {
      const validation = validateEvidenceFile(file);
      if (validation) return setMessage(validation);
    }
    await createDocument({ ...form, tags, file });
    setMessage('Nachweis gespeichert.');
    onCreated?.();
  }
  return <Card><h1 className="text-2xl font-bold">Nachweis hochladen</h1><p className="mt-2 text-sm text-slate-600">Der Typ ist bewusst frei. Es gibt keine harte Zertifikatsliste.</p>
    <form onSubmit={submit} className="mt-5 grid gap-4 md:grid-cols-2">
      <label className="space-y-1 text-sm font-medium">Titel<Input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></label>
      <label className="space-y-1 text-sm font-medium">Typ / Tag frei wählbar<Input required placeholder="z. B. Hygiene, Beatmung, eigene Bezeichnung" value={form.document_type} onChange={(e) => setForm({ ...form, document_type: e.target.value })} /></label>
      <label className="space-y-1 text-sm font-medium">Ausstellende Organisation<Input value={form.issuing_organization ?? ''} onChange={(e) => setForm({ ...form, issuing_organization: e.target.value })} /></label>
      <label className="space-y-1 text-sm font-medium">Sichtbarkeit<Select value={form.visibility} onChange={(e) => setForm({ ...form, visibility: e.target.value as DocumentInput['visibility'] })}><option value="private">Privat</option><option value="public">Öffentlich im QualiPass</option><option value="share_link">Nur mit Freigabelink</option></Select></label>
      <label className="space-y-1 text-sm font-medium">Ausstellungsdatum<Input type="date" value={form.issue_date ?? ''} onChange={(e) => setForm({ ...form, issue_date: e.target.value })} /></label>
      <label className="space-y-1 text-sm font-medium">Ablaufdatum<Input type="date" value={form.expiry_date ?? ''} onChange={(e) => setForm({ ...form, expiry_date: e.target.value })} /></label>
      <label className="space-y-1 text-sm font-medium md:col-span-2">Beschreibung<textarea className="focus-ring w-full rounded-xl border border-slate-200 px-3 py-2.5" rows={3} value={form.description ?? ''} onChange={(e) => setForm({ ...form, description: e.target.value })} /></label>
      <div className="md:col-span-2"><p className="mb-2 text-sm font-medium">Eigene Tags</p><TagInput value={tags} onChange={setTags} /></div>
      <label className="space-y-1 text-sm font-medium md:col-span-2">Datei optional, empfohlen<FileUpload onFile={setFile} /></label>
      <div className="md:col-span-2"><Button>Speichern</Button>{message && <p className="mt-3 text-sm text-care-700">{message}</p>}</div>
    </form></Card>;
}

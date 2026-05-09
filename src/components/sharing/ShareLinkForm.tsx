import type { FormEvent } from 'react';
import { useState } from 'react';
import { createShareLink } from '../../lib/shareLinks';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';

export function ShareLinkForm({ onCreated }: { onCreated?: () => void }) {
  const [title, setTitle] = useState('');
  const [expiresAt, setExpiresAt] = useState('');
  const [message, setMessage] = useState('');
  async function submit(event: FormEvent) {
    event.preventDefault();
    const link = await createShareLink(title, [], expiresAt ? new Date(expiresAt).toISOString() : undefined);
    setMessage(`Freigabelink vorbereitet: ${link.token}`);
    onCreated?.();
  }
  return <Card><h2 className="text-xl font-bold">Freigabelink vorbereiten</h2><p className="mt-2 text-sm text-slate-600">Architektur für ausgewählte Nachweise, Ablaufdatum, Passwortschutz und Zugriffprotokollierung ist vorbereitet.</p><form onSubmit={submit} className="mt-4 grid gap-3 md:grid-cols-3"><Input required placeholder="Titel" value={title} onChange={(e) => setTitle(e.target.value)} /><Input type="datetime-local" value={expiresAt} onChange={(e) => setExpiresAt(e.target.value)} /><Button>Link erzeugen</Button></form>{message && <p className="mt-3 text-sm text-care-700">{message}</p>}</Card>;
}

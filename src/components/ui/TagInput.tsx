import { useState } from 'react';
import { Button } from './Button';
import { Input } from './Input';
import { Badge } from './Badge';

export function TagInput({ value, onChange, placeholder = 'Tag hinzufügen' }: { value: string[]; onChange: (tags: string[]) => void; placeholder?: string }) {
  const [draft, setDraft] = useState('');
  const add = () => {
    const tag = draft.trim();
    if (!tag) return;
    onChange(Array.from(new Set([...value, tag])));
    setDraft('');
  };
  return <div className="space-y-3">
    <div className="flex gap-2"><Input value={draft} onChange={(event) => setDraft(event.target.value)} placeholder={placeholder} onKeyDown={(event) => { if (event.key === 'Enter') { event.preventDefault(); add(); } }} /><Button type="button" variant="secondary" onClick={add}>Hinzufügen</Button></div>
    <div className="flex flex-wrap gap-2">{value.map((tag) => <button type="button" key={tag} onClick={() => onChange(value.filter((item) => item !== tag))}><Badge tone="blue">{tag} ×</Badge></button>)}</div>
  </div>;
}

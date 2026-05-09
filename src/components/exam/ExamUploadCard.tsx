import type { FormEvent } from 'react';
import { useState } from 'react';
import { createExamDocument } from '../../lib/examDocuments';
import { validateEvidenceFile } from '../../utils/fileChecks';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';

export function ExamUploadCard({ onUploaded }: { onUploaded?: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [professionalTitle, setProfessionalTitle] = useState('');
  const [issuingAuthority, setIssuingAuthority] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [message, setMessage] = useState('');
  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!file) return setMessage('Bitte Datei auswählen.');
    const validation = validateEvidenceFile(file);
    if (validation) return setMessage(validation);
    await createExamDocument({ professional_title: professionalTitle, issuing_authority: issuingAuthority, issue_date: issueDate, file });
    setMessage('Examen wurde zur Prüfung eingereicht.');
    onUploaded?.();
  }
  return <Card><h2 className="text-xl font-bold">Pflichtnachweis Examen / Berufsurkunde</h2><p className="mt-2 text-sm text-slate-600">Ohne geprüften Pflichtnachweis bleibt der QualiPass sichtbar als „Examen noch nicht verifiziert“ gekennzeichnet.</p>
    <form onSubmit={submit} className="mt-5 grid gap-4 md:grid-cols-2">
      <label className="space-y-1 text-sm font-medium">Berufsabschluss<Input required value={professionalTitle} onChange={(e) => setProfessionalTitle(e.target.value)} /></label>
      <label className="space-y-1 text-sm font-medium">Ausstellende Stelle<Input required value={issuingAuthority} onChange={(e) => setIssuingAuthority(e.target.value)} /></label>
      <label className="space-y-1 text-sm font-medium">Ausstellungsdatum<Input type="date" value={issueDate} onChange={(e) => setIssueDate(e.target.value)} /></label>
      <label className="space-y-1 text-sm font-medium">Datei PDF/JPG/PNG<Input type="file" accept="application/pdf,image/jpeg,image/png" onChange={(e) => setFile(e.target.files?.[0] ?? null)} /></label>
      <div className="md:col-span-2"><Button>Einreichen</Button>{message && <p className="mt-3 text-sm text-care-700">{message}</p>}</div>
    </form></Card>;
}

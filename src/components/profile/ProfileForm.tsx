import type { FormEvent } from 'react';
import { useState } from 'react';
import type { Profile } from '../../types/profile';
import { updateMyProfile } from '../../lib/profiles';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { SpecialtyTagInput } from './SpecialtyTagInput';

export function ProfileForm({ profile }: { profile: Profile }) {
  const [form, setForm] = useState({
    first_name: profile.first_name ?? '', last_name: profile.last_name ?? '', job_title: profile.job_title ?? '', state: profile.state ?? '', city: profile.city ?? '', employer: profile.employer ?? '', experience_years: profile.experience_years?.toString() ?? '', bio: profile.bio ?? '', specialties: profile.specialties ?? [],
  });
  const [saved, setSaved] = useState(false);
  async function submit(event: FormEvent) {
    event.preventDefault();
    await updateMyProfile({ ...form, experience_years: form.experience_years ? Number(form.experience_years) : null });
    setSaved(true);
  }
  return <Card><h1 className="text-2xl font-bold">Profil</h1><form onSubmit={submit} className="mt-5 grid gap-4 md:grid-cols-2">
    <label className="space-y-1 text-sm font-medium">Vorname<Input required value={form.first_name} onChange={(e) => setForm({ ...form, first_name: e.target.value })} /></label>
    <label className="space-y-1 text-sm font-medium">Nachname<Input required value={form.last_name} onChange={(e) => setForm({ ...form, last_name: e.target.value })} /></label>
    <label className="space-y-1 text-sm font-medium">Berufsbezeichnung<Input required value={form.job_title} onChange={(e) => setForm({ ...form, job_title: e.target.value })} /></label>
    <label className="space-y-1 text-sm font-medium">Bundesland<Input required value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} /></label>
    <label className="space-y-1 text-sm font-medium">Stadt<Input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} /></label>
    <label className="space-y-1 text-sm font-medium">Arbeitgeber<Input value={form.employer} onChange={(e) => setForm({ ...form, employer: e.target.value })} /></label>
    <label className="space-y-1 text-sm font-medium">Berufserfahrung in Jahren<Input type="number" min="0" value={form.experience_years} onChange={(e) => setForm({ ...form, experience_years: e.target.value })} /></label>
    <label className="space-y-1 text-sm font-medium md:col-span-2">Kurzbeschreibung<textarea className="focus-ring w-full rounded-xl border border-slate-200 px-3 py-2.5" rows={4} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} /></label>
    <div className="md:col-span-2"><p className="mb-2 text-sm font-medium">Fachbereiche (frei wählbar)</p><SpecialtyTagInput value={form.specialties} onChange={(specialties) => setForm({ ...form, specialties })} /></div>
    <div className="md:col-span-2"><Button>Profil speichern</Button>{saved && <span className="ml-3 text-sm text-emerald-700">Gespeichert</span>}</div>
  </form></Card>;
}

import type { FormEvent } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { registerWithEmail } from '../lib/auth';
import { PublicShell } from '../components/layout/PublicShell';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';

export default function Register() { const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const [message,setMessage]=useState(''); async function submit(e:FormEvent){e.preventDefault(); const { error }=await registerWithEmail(email,password); setMessage(error?error.message:'Registrierung erfolgreich. Bitte E-Mail bestätigen.');} return <PublicShell><Card className="mx-auto max-w-md"><h1 className="text-2xl font-bold">Registrierung</h1><p className="mt-2 text-sm text-slate-600">E-Mail-Verifikation wird über Supabase Auth erzwungen.</p><form onSubmit={submit} className="mt-5 space-y-4"><Input type="email" placeholder="E-Mail" required value={email} onChange={(e)=>setEmail(e.target.value)}/><Input type="password" minLength={8} placeholder="Passwort" required value={password} onChange={(e)=>setPassword(e.target.value)}/><Button className="w-full">Account erstellen</Button></form>{message&&<p className="mt-3 text-sm text-care-700">{message}</p>}<p className="mt-4 text-sm"><Link className="text-care-700" to="/login">Zum Login</Link></p></Card></PublicShell>; }

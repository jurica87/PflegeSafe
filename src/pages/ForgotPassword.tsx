import type { FormEvent } from 'react';
import { useState } from 'react';
import { requestPasswordReset } from '../lib/auth';
import { PublicShell } from '../components/layout/PublicShell';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';

export default function ForgotPassword(){const[email,setEmail]=useState('');const[message,setMessage]=useState('');async function submit(e:FormEvent){e.preventDefault();const{error}=await requestPasswordReset(email);setMessage(error?error.message:'Wenn die Adresse existiert, wurde eine E-Mail versendet.');}return <PublicShell><Card className="mx-auto max-w-md"><h1 className="text-2xl font-bold">Passwort vergessen</h1><form onSubmit={submit} className="mt-5 space-y-4"><Input type="email" required placeholder="E-Mail" value={email} onChange={(e)=>setEmail(e.target.value)}/><Button className="w-full">Reset-Link senden</Button></form>{message&&<p className="mt-3 text-sm text-care-700">{message}</p>}</Card></PublicShell>}

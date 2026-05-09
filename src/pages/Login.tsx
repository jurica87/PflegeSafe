import type { FormEvent } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginWithEmail } from '../lib/auth';
import { PublicShell } from '../components/layout/PublicShell';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [error, setError] = useState('');
  async function submit(e: FormEvent) { e.preventDefault(); const { error } = await loginWithEmail(email, password); if (error) setError(error.message); else navigate('/dashboard'); }
  return <PublicShell><Card className="mx-auto max-w-md"><h1 className="text-2xl font-bold">Login</h1><form onSubmit={submit} className="mt-5 space-y-4"><Input type="email" placeholder="E-Mail" value={email} onChange={(e)=>setEmail(e.target.value)} required/><Input type="password" placeholder="Passwort" value={password} onChange={(e)=>setPassword(e.target.value)} required/><Button className="w-full">Einloggen</Button></form>{error && <p className="mt-3 text-sm text-red-600">{error}</p>}<p className="mt-4 text-sm"><Link className="text-care-700" to="/forgot-password">Passwort vergessen</Link> · <Link className="text-care-700" to="/register">Registrieren</Link></p></Card></PublicShell>;
}

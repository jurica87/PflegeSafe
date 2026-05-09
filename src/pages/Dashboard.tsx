import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../App';
import { listMyDocuments } from '../lib/documents';
import { listMyExamDocuments } from '../lib/examDocuments';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { getExpiringDocuments } from '../services/documentSearchService';
import { profileStatusLabel } from '../services/profileStatusService';
import type { DocumentRecord } from '../types/document';

export default function Dashboard(){const{profile}=useAuth();const[docs,setDocs]=useState<DocumentRecord[]>([]);const[examCount,setExamCount]=useState(0);useEffect(()=>{listMyDocuments().then(setDocs);listMyExamDocuments().then((rows)=>setExamCount(rows.length));},[]);const expiring=getExpiringDocuments(docs);const publicDocs=docs.filter(d=>d.visibility==='public');return <div className="space-y-6"><div><h1 className="text-3xl font-bold">Dashboard</h1><p className="text-slate-600">Status, Ablaufwarnungen und Profilvollständigkeit auf einen Blick.</p></div><div className="grid gap-4 md:grid-cols-4"><Card><p className="text-sm text-slate-500">Profilstatus</p><div className="mt-2"><Badge tone={profile?.profile_status==='verified'?'green':'amber'}>{profile?profileStatusLabel(profile.profile_status):'—'}</Badge></div></Card><Card><p className="text-sm text-slate-500">Nachweise</p><p className="text-3xl font-bold">{docs.length}</p></Card><Card><p className="text-sm text-slate-500">Ablaufend</p><p className="text-3xl font-bold">{expiring.length}</p></Card><Card><p className="text-sm text-slate-500">Öffentlich / Privat</p><p className="text-3xl font-bold">{publicDocs.length}/{docs.length-publicDocs.length}</p></Card></div>{examCount===0&&<Card className="border-amber-200 bg-amber-50"><h2 className="font-bold">Examen fehlt</h2><p className="mt-1 text-sm text-slate-700">Ohne Pflichtnachweis kann der QualiPass nicht vollständig freigeschaltet werden.</p><Link to="/exam"><Button className="mt-4">Examen hochladen</Button></Link></Card>}</div>}

import { useEffect, useState } from 'react';
import { ShareLinkForm } from '../components/sharing/ShareLinkForm';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { listMyShareLinks } from '../lib/shareLinks';
import type { ShareLink } from '../types/sharing';
import { formatDate } from '../utils/dates';

export default function ShareLinks(){const[links,setLinks]=useState<ShareLink[]>([]);const load=()=>listMyShareLinks().then(setLinks);useEffect(load,[]);return <div className="space-y-5"><ShareLinkForm onCreated={load}/><Card><h2 className="text-xl font-bold">Freigabelinks</h2><div className="mt-4 space-y-3">{links.map(link=><div key={link.id} className="rounded-2xl border p-4"><div className="flex justify-between"><div><p className="font-semibold">{link.title}</p><p className="text-sm text-slate-600">Ablauf: {formatDate(link.expires_at)}</p></div><Badge tone={link.is_active?'green':'slate'}>{link.is_active?'aktiv':'deaktiviert'}</Badge></div></div>)}</div></Card></div>}

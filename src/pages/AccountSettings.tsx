import { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { exportMyData } from '../services/exportService';

export default function AccountSettings(){const[message,setMessage]=useState('');async function download(){const data=await exportMyData();const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='pflegesafe-export.json';a.click();URL.revokeObjectURL(url);}return <div className="space-y-4"><Card><h1 className="text-2xl font-bold">Account & DSGVO</h1><p className="mt-2 text-slate-600">Export ist vorbereitet. Löschung wird über Datenbank-Cascade, Storage-Cleanup und Audit-Prozess produktiv ergänzt.</p><div className="mt-4 flex gap-2"><Button onClick={download}>Meine Daten exportieren</Button><Button variant="danger" onClick={()=>setMessage('Account-Löschung ist als Prozess vorbereitet und benötigt produktive Bestätigung.')} >Account löschen vorbereiten</Button></div>{message&&<p className="mt-3 text-sm text-red-700">{message}</p>}</Card></div>}

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { listMyDocuments } from '../lib/documents';
import { createSignedFileUrl } from '../lib/storage';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { DocumentCard } from '../components/documents/DocumentCard';
import type { DocumentRecord } from '../types/document';

export default function DocumentDetail(){const{id}=useParams();const[doc,setDoc]=useState<DocumentRecord|null>(null);const[url,setUrl]=useState('');useEffect(()=>{listMyDocuments().then(rows=>setDoc(rows.find(row=>row.id===id)??null));},[id]);async function signed(){if(doc?.file_path)setUrl(await createSignedFileUrl('user-documents',doc.file_path));}if(!doc)return <Card>Nachweis wird geladen…</Card>;return <div className="space-y-4"><DocumentCard document={doc}/><Card><h2 className="font-bold">Dateizugriff</h2><p className="text-sm text-slate-600">Private Dateien werden ausschließlich über kurzlebige Signed URLs geöffnet.</p>{doc.file_path?<Button className="mt-3" onClick={signed}>Sichere Vorschau/Download erzeugen</Button>:<p className="mt-3">Keine Datei hinterlegt.</p>}{url&&<p className="mt-3 break-all text-sm text-care-700"><a href={url} target="_blank" rel="noreferrer">{url}</a></p>}</Card></div>}

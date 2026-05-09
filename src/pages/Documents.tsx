import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { listMyDocuments } from '../lib/documents';
import type { DocumentFilters as Filters, DocumentRecord } from '../types/document';
import { DocumentCard } from '../components/documents/DocumentCard';
import { DocumentFilters } from '../components/documents/DocumentFilters';
import { Button } from '../components/ui/Button';

export default function Documents(){const[docs,setDocs]=useState<DocumentRecord[]>([]);const[filters,setFilters]=useState<Filters>({sortBy:'created_at'});useEffect(()=>{listMyDocuments(filters).then(setDocs)},[filters]);return <div className="space-y-5"><div className="flex items-center justify-between"><div><h1 className="text-3xl font-bold">Nachweise verwalten</h1><p className="text-slate-600">Suchen, filtern, archivieren und Sichtbarkeit steuern.</p></div><Link to="/documents/new"><Button>Nachweis hochladen</Button></Link></div><DocumentFilters value={filters} onChange={setFilters}/><div className="grid gap-4 md:grid-cols-3">{docs.map(doc=><Link key={doc.id} to={`/documents/${doc.id}`}><DocumentCard document={doc}/></Link>)}</div></div>}

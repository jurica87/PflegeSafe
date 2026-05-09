import { useEffect, useState } from 'react';
import { ExamUploadCard } from '../components/exam/ExamUploadCard';
import { ExamStatusBadge } from '../components/exam/ExamStatusBadge';
import { Card } from '../components/ui/Card';
import { listMyExamDocuments } from '../lib/examDocuments';
import type { ExamDocument } from '../types/exam';
import { formatDate } from '../utils/dates';

export default function ExamUpload(){const[rows,setRows]=useState<ExamDocument[]>([]);const load=()=>listMyExamDocuments().then(setRows);useEffect(load,[]);return <div className="space-y-6"><ExamUploadCard onUploaded={load}/><Card><h2 className="text-xl font-bold">Eingereichte Pflichtnachweise</h2><div className="mt-4 space-y-3">{rows.map(row=><div key={row.id} className="rounded-2xl border p-4"><div className="flex justify-between"><div><p className="font-semibold">{row.professional_title}</p><p className="text-sm text-slate-600">{row.issuing_authority} · {formatDate(row.issue_date)}</p></div><ExamStatusBadge status={row.verification_status}/></div>{row.admin_comment&&<p className="mt-2 text-sm text-slate-600">Admin-Kommentar: {row.admin_comment}</p>}</div>)}</div></Card></div>}

import type { DocumentRecord } from '../../types/document';
import { formatDate } from '../../utils/dates';
import { verificationLabel } from '../../services/verificationService';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { ExpiryBadge } from './ExpiryBadge';

export function DocumentCard({ document }: { document: DocumentRecord }) {
  return <Card className="h-full"><div className="flex items-start justify-between gap-3"><div><h3 className="font-bold text-slate-900">{document.title}</h3><p className="text-sm text-slate-600">{document.document_type}</p></div><ExpiryBadge date={document.expiry_date} /></div>
    <div className="mt-4 flex flex-wrap gap-2"><Badge tone={document.visibility === 'public' ? 'blue' : 'slate'}>{document.visibility}</Badge><Badge tone={document.verification_status === 'verified' ? 'green' : document.verification_status === 'submitted' ? 'amber' : 'slate'}>{verificationLabel(document.verification_status)}</Badge></div>
    <p className="mt-4 text-sm text-slate-600">Ablauf: {formatDate(document.expiry_date)}</p>
  </Card>;
}

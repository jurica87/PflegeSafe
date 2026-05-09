import { Badge } from '../ui/Badge';
import type { ExamVerificationStatus } from '../../types/exam';
import { verificationLabel } from '../../services/verificationService';

export function ExamStatusBadge({ status }: { status: ExamVerificationStatus }) {
  const tone = status === 'verified' ? 'green' : status === 'rejected' ? 'red' : status === 'submitted' ? 'amber' : 'slate';
  return <Badge tone={tone}>{verificationLabel(status)}</Badge>;
}

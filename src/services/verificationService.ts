import type { VerificationStatus } from '../types/document';
import type { ExamVerificationStatus } from '../types/exam';

export function verificationLabel(status: VerificationStatus | ExamVerificationStatus): string {
  return {
    self_declared: 'Selbst angegeben',
    unverified: 'Nicht geprüft',
    submitted: 'Zur Prüfung eingereicht',
    verified: 'Geprüft',
    rejected: 'Abgelehnt',
  }[status];
}

export function canPublishVerification(status: VerificationStatus): boolean {
  return status !== 'rejected';
}

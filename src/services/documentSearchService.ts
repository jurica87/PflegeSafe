import type { DocumentRecord } from '../types/document';
import { daysUntil } from '../utils/dates';

export function getDuplicateTitleHints(documents: DocumentRecord[], title: string): DocumentRecord[] {
  const normalized = title.trim().toLowerCase();
  if (!normalized) return [];
  return documents.filter((doc) => doc.title.toLowerCase().includes(normalized) || normalized.includes(doc.title.toLowerCase()));
}

export function getExpiringDocuments(documents: DocumentRecord[], days = 60): DocumentRecord[] {
  return documents.filter((doc) => {
    const remaining = daysUntil(doc.expiry_date);
    return remaining !== null && remaining >= 0 && remaining <= days;
  });
}

export function formatDate(date?: string | null): string {
  if (!date) return '—';
  return new Intl.DateTimeFormat('de-DE', { dateStyle: 'medium' }).format(new Date(date));
}

export function daysUntil(date?: string | null): number | null {
  if (!date) return null;
  const today = new Date();
  const target = new Date(date);
  return Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

export function isExpiringSoon(date?: string | null, windowDays = 60): boolean {
  const days = daysUntil(date);
  return days !== null && days >= 0 && days <= windowDays;
}

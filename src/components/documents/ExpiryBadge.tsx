import { Badge } from '../ui/Badge';
import { daysUntil } from '../../utils/dates';

export function ExpiryBadge({ date }: { date?: string | null }) {
  const days = daysUntil(date);
  if (days === null) return <Badge>Kein Ablauf</Badge>;
  if (days < 0) return <Badge tone="red">Abgelaufen</Badge>;
  if (days <= 60) return <Badge tone="amber">Läuft in {days} Tagen ab</Badge>;
  return <Badge tone="green">Gültig</Badge>;
}

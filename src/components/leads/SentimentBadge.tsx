import Badge from '@/components/ui/Badge';
import { getSentimentLabel } from '@/lib/utils';

interface SentimentBadgeProps {
  sentiment: number;
}

export default function SentimentBadge({ sentiment }: SentimentBadgeProps) {
  const label = getSentimentLabel(sentiment);
  const variant = sentiment >= 0.6 ? 'success' : sentiment >= 0.3 ? 'warning' : 'danger';

  return (
    <Badge variant={variant}>
      {label} ({Math.round(sentiment * 100)}%)
    </Badge>
  );
}

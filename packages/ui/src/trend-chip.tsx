import { TrendingDown, TrendingUp } from 'lucide-react';
import { Badge } from './badge';

type Props = {
  trend: number;
}

export const TrendChip = (
  { trend }
: Props
) => {
  const Icon = trend < 0 ? TrendingDown : TrendingUp;
  return (
    <Badge variant="secondary">
      <Icon className="size-4" />
      <span>{trend}</span>
    </Badge>
  )
}

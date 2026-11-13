import { css } from 'styled-system/css';
import { statusBadgeStyle } from '@/modules/common/recipes/badge.recipe';

interface StatusBadgeProps {
  status: 'active' | 'trial' | 'paused' | 'cancelled';
}

const statusDotStyle = css({
  width: '6px',
  height: '6px',
  borderRadius: '50%',
  background: 'currentColor',
});

const labelMap: Record<StatusBadgeProps['status'], string> = {
  active: 'Active',
  trial: 'Trial',
  paused: 'Paused',
  cancelled: 'Cancelled',
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const badgeClass = statusBadgeStyle({ status });

  return (
    <span className={badgeClass}>
      <span className={statusDotStyle} />
      {labelMap[status]}
    </span>
  );
}

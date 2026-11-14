import { SubscriptionCardSkeleton } from '@/modules/subscriptions/components/SubscriptionCardSkeleton';
import { subscriptionGridStyles } from '@/modules/subscriptions/recipes/subscriptionGrid.recipe';

interface SubscriptionGridSkeletonProps {
  count?: number;
}

export function SubscriptionGridSkeleton({ count = 6 }: SubscriptionGridSkeletonProps) {
  const classes = subscriptionGridStyles();
  const placeholders = Array.from({ length: count }, (_, i) => i);

  return (
    <div role="status" aria-label="Loading subscriptions" aria-busy="true" className={classes.root}>
      {placeholders.map((idx) => (
        <SubscriptionCardSkeleton key={idx} />
      ))}
    </div>
  );
}

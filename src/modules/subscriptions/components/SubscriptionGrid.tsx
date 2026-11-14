import { SubscriptionCard } from '@/modules/subscriptions/components/SubscriptionCard';
import { subscriptionGridStyles } from '@/modules/subscriptions/recipes/subscriptionGrid.recipe';
import { Subscription } from '@/modules/subscriptions/types/subscription.types';

interface SubscriptionGridProps {
  subscriptions: Subscription[];
  onEdit?: (subscription: Subscription) => void;
}

export function SubscriptionGrid({ subscriptions, onEdit }: SubscriptionGridProps) {
  const classes = subscriptionGridStyles();

  if (subscriptions.length === 0) {
    return (
      <div className={classes.emptyState}>
        <h3 className={classes.emptyTitle}>No subscriptions found</h3>
        <p className={classes.emptySubtitle}>Try adjusting your search query or category filter.</p>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      {subscriptions.map((subscription) => (
        <SubscriptionCard key={subscription.id} subscription={subscription} onEdit={onEdit} />
      ))}
    </div>
  );
}

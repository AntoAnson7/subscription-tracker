import { SubscriptionCard } from '@/modules/subscriptions/components/SubscriptionCard';
import { subscriptionGridStyles } from '@/modules/subscriptions/recipes/subscriptionGrid.recipe';
import { Subscription } from '@/modules/subscriptions/types/subscription.types';

interface SubscriptionGridProps {
  subscriptions: Subscription[];
  onEdit?: (subscription: Subscription) => void;
  onCancel?: (id: string) => void;
  onRenew?: (subscription: Subscription) => void;
}

export function SubscriptionGrid({
  subscriptions,
  onEdit,
  onCancel,
  onRenew,
}: SubscriptionGridProps) {
  const classes = subscriptionGridStyles();

  if (subscriptions.length === 0) {
    return (
      <div className={classes.emptyState}>
        <h3 className={classes.emptyTitle}>No subscriptions found</h3>
        <p className={classes.emptySubtitle}>Try adjusting your search query or category filter.</p>
      </div>
    );
  }

  const activeSubs = subscriptions.filter((sub) => sub.status !== 'cancelled');
  const cancelledSubs = subscriptions.filter((sub) => sub.status === 'cancelled');

  return (
    <div>
      {activeSubs.length > 0 ? (
        <div className={classes.root}>
          {activeSubs.map((subscription) => (
            <SubscriptionCard
              key={subscription.id}
              subscription={subscription}
              onEdit={onEdit}
              onCancel={onCancel}
              onRenew={onRenew}
            />
          ))}
        </div>
      ) : null}

      {cancelledSubs.length > 0 ? (
        <section className={classes.cancelledSection}>
          <div className={classes.cancelledHeader}>
            <h3 className={classes.cancelledTitle}>Cancelled subscriptions</h3>
            <span className={classes.cancelledBadge}>{cancelledSubs.length}</span>
          </div>
          <div className={classes.root}>
            {cancelledSubs.map((subscription) => (
              <SubscriptionCard
                key={subscription.id}
                subscription={subscription}
                onEdit={onEdit}
                onCancel={onCancel}
                onRenew={onRenew}
              />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}

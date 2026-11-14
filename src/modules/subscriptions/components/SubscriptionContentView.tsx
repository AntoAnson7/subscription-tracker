import { SubscriptionGrid } from '@/modules/subscriptions/components/SubscriptionGrid';
import { SubscriptionGridSkeleton } from '@/modules/subscriptions/components/SubscriptionGridSkeleton';
import { SubscriptionTable } from '@/modules/subscriptions/components/SubscriptionTable';
import { SubscriptionTableSkeleton } from '@/modules/subscriptions/components/SubscriptionTableSkeleton';
import { Subscription } from '@/modules/subscriptions/types/subscription.types';

interface SubscriptionContentViewProps {
  viewMode: 'grid' | 'table';
  isLoading: boolean;
  subscriptions: Subscription[];
  onEdit: (subscription: Subscription) => void;
}

export function SubscriptionContentView({
  viewMode,
  isLoading,
  subscriptions,
  onEdit,
}: SubscriptionContentViewProps) {
  if (isLoading) {
    return viewMode === 'grid' ? <SubscriptionGridSkeleton /> : <SubscriptionTableSkeleton />;
  }

  return viewMode === 'grid' ? (
    <SubscriptionGrid subscriptions={subscriptions} onEdit={onEdit} />
  ) : (
    <SubscriptionTable subscriptions={subscriptions} onEdit={onEdit} />
  );
}

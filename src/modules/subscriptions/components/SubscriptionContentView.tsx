import { SubscriptionGrid } from '@/modules/subscriptions/components/SubscriptionGrid';
import { SubscriptionGridSkeleton } from '@/modules/subscriptions/components/SubscriptionGridSkeleton';
import { SubscriptionTable } from '@/modules/subscriptions/components/SubscriptionTable';
import { SubscriptionTableSkeleton } from '@/modules/subscriptions/components/SubscriptionTableSkeleton';
import { Subscription } from '@/modules/subscriptions/types/subscription.types';

interface SubscriptionContentViewProps {
  viewMode: 'grid' | 'table';
  isLoading: boolean;
  showAllSkeletons?: boolean;
  subscriptions: Subscription[];
  onEdit: (subscription: Subscription) => void;
  onCancel?: (id: string) => void;
  onRenew?: (subscription: Subscription) => void;
}

export function SubscriptionContentView({
  viewMode,
  isLoading,
  showAllSkeletons = false,
  subscriptions,
  onEdit,
  onCancel,
  onRenew,
}: SubscriptionContentViewProps) {
  if (isLoading || showAllSkeletons) {
    return viewMode === 'grid' ? (
      <SubscriptionGridSkeleton count={6} />
    ) : (
      <SubscriptionTableSkeleton rows={5} />
    );
  }

  return viewMode === 'grid' ? (
    <SubscriptionGrid
      subscriptions={subscriptions}
      onEdit={onEdit}
      onCancel={onCancel}
      onRenew={onRenew}
    />
  ) : (
    <SubscriptionTable
      subscriptions={subscriptions}
      onEdit={onEdit}
      onCancel={onCancel}
      onRenew={onRenew}
    />
  );
}

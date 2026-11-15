import { useCallback, useState } from 'react';
import { SubscriptionFormData } from '@/modules/subscriptions/types/form.types';
import { Subscription } from '@/modules/subscriptions/types/subscription.types';
import { useCancellationAlerts } from '@/modules/sync/hooks/useCancellationAlerts';
import { useEmailAccounts } from '@/modules/sync/hooks/useEmailAccounts';
import { useEmailSync } from '@/modules/sync/hooks/useEmailSync';
import { useGoogleOAuthCallback } from '@/modules/sync/hooks/useGoogleOAuthCallback';
import { usePaymentHistory } from '@/modules/sync/hooks/usePaymentHistory';
import { DiscoveredSubscription } from '@/modules/sync/types/sync.types';

interface UseSyncManagerParams {
  userId: string | null;
  subscriptions: Subscription[];
  onAddSubscription: (data: SubscriptionFormData) => Promise<void> | void;
  onCancelSubscription: (id: string) => Promise<void> | void;
}

export function useSyncManager({
  userId,
  subscriptions,
  onAddSubscription,
  onCancelSubscription,
}: UseSyncManagerParams) {
  const [isConsentModalOpen, setIsConsentModalOpen] = useState(false);
  const [activeSubForPayments, setActiveSubForPayments] = useState<Subscription | null>(null);

  const {
    accounts: linkedAccounts,
    hasLinkedAccounts,
    linkAccount,
    unlinkAccount,
    updateAccountSync,
  } = useEmailAccounts(userId);

  useGoogleOAuthCallback(linkAccount);

  const { payments, addPayment, getPaymentsForSubscription } = usePaymentHistory();

  const {
    alerts: cancellationAlerts,
    confirmAlert: confirmCancellation,
    dismissAlert: dismissCancellation,
    addAlert: addCancellationAlert,
  } = useCancellationAlerts(onCancelSubscription);

  const {
    isSyncing,
    discoveredSubs,
    isReviewOpen,
    lastSyncResult,
    scanEmails,
    toggleSelection,
    closeReview,
  } = useEmailSync({
    accounts: linkedAccounts,
    subscriptions,
    updateAccountSync,
    addPayment,
    addCancellationAlert,
  });

  const confirmDiscoveredSubs = useCallback(
    async (selected: DiscoveredSubscription[]) => {
      for (const item of selected) {
        await onAddSubscription({
          name: item.name,
          category: item.category,
          cost: item.cost,
          currency: item.currency,
          cycle: item.cycle,
          status: 'active',
          startDate: new Date().toISOString().split('T')[0],
          renewalDate: item.renewalDate,
          brandColor: item.brandColor,
          iconSlug: item.iconSlug,
          cancellationUrl: null,
          websiteUrl: null,
          notes: `Auto-detected from receipt (${item.sourceEmailSubject})`,
        });
      }
    },
    [onAddSubscription]
  );

  return {
    linkedAccounts,
    hasLinkedAccounts,
    isConsentModalOpen,
    isSyncing,
    discoveredSubs,
    isReviewOpen,
    lastSyncResult,
    cancellationAlerts,
    payments,
    activeSubForPayments,
    setIsConsentModalOpen,
    setActiveSubForPayments,
    linkAccount,
    unlinkAccount,
    scanEmails,
    toggleSelection,
    closeReview,
    confirmDiscoveredSubs,
    confirmCancellation,
    dismissCancellation,
    getPaymentsForSubscription,
  };
}

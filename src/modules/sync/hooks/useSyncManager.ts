import { useCallback, useState } from 'react';
import { SubscriptionFormData } from '@/modules/subscriptions/types/form.types';
import { Subscription } from '@/modules/subscriptions/types/subscription.types';
import { useCancellationAlerts } from '@/modules/sync/hooks/useCancellationAlerts';
import { useEmailAccounts } from '@/modules/sync/hooks/useEmailAccounts';
import { useEmailSync } from '@/modules/sync/hooks/useEmailSync';
import { useGoogleOAuthCallback } from '@/modules/sync/hooks/useGoogleOAuthCallback';
import { usePaymentHistory } from '@/modules/sync/hooks/usePaymentHistory';
import { usePriceHikeAlerts } from '@/modules/sync/hooks/usePriceHikeAlerts';
import { DiscoveredSubscription, EmailProvider } from '@/modules/sync/types/sync.types';

interface UseSyncManagerParams {
  userId: string | null;
  subscriptions: Subscription[];
  onAddSubscription: (data: SubscriptionFormData) => Promise<void> | void;
  onCancelSubscription: (id: string) => Promise<void> | void;
  onUpdateSubscriptionCost: (id: string, newCost: number) => Promise<void> | void;
}

export function useSyncManager({
  userId,
  subscriptions,
  onAddSubscription,
  onCancelSubscription,
  onUpdateSubscriptionCost,
}: UseSyncManagerParams) {
  const [isConsentModalOpen, setIsConsentModalOpen] = useState(false);
  const [activeSubForPayments, setActiveSubForPayments] = useState<Subscription | null>(null);
  const [promptScanAccount, setPromptScanAccount] = useState<{ id: string; email: string } | null>(
    null
  );

  const {
    accounts: linkedAccounts,
    hasLinkedAccounts,
    linkAccount,
    unlinkAccount,
    updateAccountSync,
  } = useEmailAccounts(userId);

  const handleLinkAccount = useCallback(
    (
      email: string,
      provider: EmailProvider = 'gmail',
      isSimulated = false,
      accessToken?: string,
      tokenExpiresAt?: number
    ): string | null => {
      const accountId = linkAccount(email, provider, isSimulated, accessToken, tokenExpiresAt);
      if (accountId) {
        setPromptScanAccount({ id: accountId, email });
      }
      return accountId;
    },
    [linkAccount]
  );

  useGoogleOAuthCallback(handleLinkAccount);

  const { payments, addPayment, getPaymentsForSubscription } = usePaymentHistory();

  const {
    alerts: cancellationAlerts,
    confirmAlert: confirmCancellation,
    dismissAlert: dismissCancellation,
    addAlert: addCancellationAlert,
  } = useCancellationAlerts(onCancelSubscription);

  const { priceHikeAlerts, applyPriceHike, dismissPriceHike } = usePriceHikeAlerts({
    payments,
    subscriptions,
    onUpdateSubscriptionCost,
  });

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
    priceHikeAlerts,
    payments,
    activeSubForPayments,
    promptScanAccount,
    setPromptScanAccount,
    setIsConsentModalOpen,
    setActiveSubForPayments,
    linkAccount: handleLinkAccount,
    unlinkAccount,
    scanEmails,
    toggleSelection,
    closeReview,
    confirmDiscoveredSubs,
    confirmCancellation,
    dismissCancellation,
    applyPriceHike,
    dismissPriceHike,
    getPaymentsForSubscription,
  };
}

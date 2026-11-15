import { useCallback, useState } from 'react';
import { Subscription } from '@/modules/subscriptions/types/subscription.types';
import { SIMULATED_EMAIL_RECEIPTS } from '@/modules/sync/data/simulatedEmails';
import {
  parseEmailReceipt,
  toDiscoveredSub,
  toPaymentRecord,
} from '@/modules/sync/parsers/receiptParser';
import { matchSubscriptionByMerchant } from '@/modules/sync/parsers/subscriptionMatcher';
import {
  CancellationAlert,
  DiscoveredSubscription,
  LinkedEmailAccount,
  PaymentRecord,
} from '@/modules/sync/types/sync.types';

interface UseEmailSyncParams {
  accounts: LinkedEmailAccount[];
  subscriptions: Subscription[];
  updateAccountSync: (id: string, status: 'active' | 'syncing' | 'error') => void;
  addPayment: (record: PaymentRecord) => void;
  addCancellationAlert: (alert: CancellationAlert) => void;
}

export function useEmailSync({
  accounts,
  subscriptions,
  updateAccountSync,
  addPayment,
  addCancellationAlert,
}: UseEmailSyncParams) {
  const [isSyncing, setIsSyncing] = useState(false);
  const [discoveredSubs, setDiscoveredSubs] = useState<DiscoveredSubscription[]>([]);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [lastSyncResult, setLastSyncResult] = useState<string | null>(null);

  const scanEmails = useCallback(
    async (targetAccountId?: string) => {
      const activeAccounts = targetAccountId
        ? accounts.filter((a) => a.id === targetAccountId)
        : accounts.filter((a) => a.status === 'active');

      if (activeAccounts.length === 0) return;

      setIsSyncing(true);
      activeAccounts.forEach((acc) => updateAccountSync(acc.id, 'syncing'));

      // Simulate network scan delay with 1.2s smooth scan
      await new Promise((resolve) => setTimeout(resolve, 1200));

      const newDiscovered: DiscoveredSubscription[] = [];
      let debitMatchesCount = 0;
      let cancellationsCount = 0;

      for (const receipt of SIMULATED_EMAIL_RECEIPTS) {
        const parsed = parseEmailReceipt(receipt);

        if (parsed.eventType === 'new_subscription') {
          // Check if user already tracks this subscription
          const exists = subscriptions.some(
            (s) => s.name.toLowerCase() === parsed.merchantName.toLowerCase()
          );
          if (!exists) {
            newDiscovered.push(toDiscoveredSub(receipt, parsed));
          }
        } else if (parsed.eventType === 'payment_debit') {
          const matched = matchSubscriptionByMerchant(parsed.merchantName, subscriptions);
          if (matched) {
            addPayment(toPaymentRecord(receipt, parsed, matched.id));
            debitMatchesCount += 1;
          }
        } else if (parsed.eventType === 'cancellation') {
          const matched = matchSubscriptionByMerchant(parsed.merchantName, subscriptions);
          if (matched && matched.status !== 'cancelled') {
            addCancellationAlert({
              id: `cancel-${receipt.id}`,
              subscriptionId: matched.id,
              subscriptionName: matched.name,
              accountEmail: receipt.accountEmail,
              detectedDate: receipt.date,
              sourceSubject: receipt.subject,
              status: 'pending',
            });
            cancellationsCount += 1;
          }
        }
      }

      activeAccounts.forEach((acc) => updateAccountSync(acc.id, 'active'));
      setIsSyncing(false);

      if (newDiscovered.length > 0) {
        setDiscoveredSubs(newDiscovered);
        setIsReviewOpen(true);
      }

      setLastSyncResult(
        `Scan complete: ${newDiscovered.length} new detected, ${debitMatchesCount} debits matched, ${cancellationsCount} cancellations flagged.`
      );
    },
    [accounts, subscriptions, updateAccountSync, addPayment, addCancellationAlert]
  );

  const toggleSelection = useCallback((id: string) => {
    setDiscoveredSubs((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isSelected: !item.isSelected } : item))
    );
  }, []);

  const closeReview = useCallback(() => {
    setIsReviewOpen(false);
  }, []);

  return {
    isSyncing,
    discoveredSubs,
    isReviewOpen,
    lastSyncResult,
    scanEmails,
    toggleSelection,
    closeReview,
  };
}

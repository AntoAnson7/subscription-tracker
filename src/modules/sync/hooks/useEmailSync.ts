import { useCallback, useState } from 'react';
import { Subscription } from '@/modules/subscriptions/types/subscription.types';
import { fetchGmailReceipts } from '@/modules/sync/services/gmailApi.service';
import {
  CancellationAlert,
  DiscoveredSubscription,
  EmailReceipt,
  LinkedEmailAccount,
  PaymentRecord,
} from '@/modules/sync/types/sync.types';
import { processReceipts } from '@/modules/sync/utils/receiptProcessor.utils';

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
      const targetAccounts = targetAccountId
        ? accounts.filter((a) => a.id === targetAccountId)
        : accounts.filter((a) => a.status === 'active');

      if (targetAccounts.length === 0) return;

      setIsSyncing(true);
      targetAccounts.forEach((acc) => updateAccountSync(acc.id, 'syncing'));

      const allReceipts: EmailReceipt[] = [];
      let authErrors = 0;

      for (const account of targetAccounts) {
        if (account.accessToken) {
          try {
            const fetched = await fetchGmailReceipts(account.accessToken, account.email);
            allReceipts.push(...fetched);
            updateAccountSync(account.id, 'active');
          } catch {
            updateAccountSync(account.id, 'error');
            authErrors += 1;
          }
        } else {
          updateAccountSync(account.id, 'active');
        }
      }

      const { newDiscovered, debitMatchesCount, cancellationsCount } = processReceipts(
        allReceipts,
        subscriptions,
        { addPayment, addCancellationAlert }
      );

      setIsSyncing(false);

      if (newDiscovered.length > 0) {
        setDiscoveredSubs(newDiscovered);
        setIsReviewOpen(true);
      }

      if (authErrors > 0) {
        setLastSyncResult(
          `Sync warning: Google authorization expired for ${authErrors} account(s). Please reconnect.`
        );
      } else if (allReceipts.length === 0) {
        setLastSyncResult('Scan complete: No transactional subscription receipts found in inbox.');
      } else {
        setLastSyncResult(
          `Scan complete: Found ${allReceipts.length} receipts (${newDiscovered.length} new subs, ${debitMatchesCount} debits, ${cancellationsCount} cancellations).`
        );
      }
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

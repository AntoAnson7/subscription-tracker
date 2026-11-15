import { Subscription } from '@/modules/subscriptions/types/subscription.types';
import {
  parseEmailReceipt,
  toDiscoveredSub,
  toPaymentRecord,
} from '@/modules/sync/parsers/receiptParser';
import { matchSubscriptionByMerchant } from '@/modules/sync/parsers/subscriptionMatcher';
import {
  CancellationAlert,
  DiscoveredSubscription,
  EmailReceipt,
  PaymentRecord,
} from '@/modules/sync/types/sync.types';

interface ProcessReceiptsCallbacks {
  addPayment: (record: PaymentRecord) => void;
  addCancellationAlert: (alert: CancellationAlert) => void;
}

export function processReceipts(
  receipts: EmailReceipt[],
  subscriptions: Subscription[],
  callbacks: ProcessReceiptsCallbacks
): {
  newDiscovered: DiscoveredSubscription[];
  debitMatchesCount: number;
  cancellationsCount: number;
} {
  const newDiscovered: DiscoveredSubscription[] = [];
  let debitMatchesCount = 0;
  let cancellationsCount = 0;

  for (const receipt of receipts) {
    const parsed = parseEmailReceipt(receipt);

    if (parsed.eventType === 'new_subscription') {
      const exists = subscriptions.some(
        (s) => s.name.toLowerCase() === parsed.merchantName.toLowerCase()
      );
      if (!exists && !newDiscovered.some((d) => d.name === parsed.merchantName)) {
        newDiscovered.push(toDiscoveredSub(receipt, parsed));
      }
    } else if (parsed.eventType === 'payment_debit') {
      const matched = matchSubscriptionByMerchant(parsed.merchantName, subscriptions);
      if (matched) {
        callbacks.addPayment(toPaymentRecord(receipt, parsed, matched.id));
        debitMatchesCount += 1;
      }
    } else if (parsed.eventType === 'cancellation') {
      const matched = matchSubscriptionByMerchant(parsed.merchantName, subscriptions);
      if (matched && matched.status !== 'cancelled') {
        callbacks.addCancellationAlert({
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

  return { newDiscovered, debitMatchesCount, cancellationsCount };
}

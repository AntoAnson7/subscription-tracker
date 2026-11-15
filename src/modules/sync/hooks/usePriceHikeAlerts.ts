import { useCallback, useMemo, useState } from 'react';
import { Subscription } from '@/modules/subscriptions/types/subscription.types';
import { PriceHikeAlert } from '@/modules/sync/types/priceHike.types';
import { PaymentRecord } from '@/modules/sync/types/sync.types';

const DISMISSED_KEY = 'subtrack-dismissed-price-hikes';

function loadDismissedIds(): string[] {
  if (typeof window === 'undefined') return [];
  const raw = localStorage.getItem(DISMISSED_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as string[];
  } catch {
    return [];
  }
}

function saveDismissedIds(ids: string[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(DISMISSED_KEY, JSON.stringify(ids));
}

interface UsePriceHikeAlertsParams {
  payments: PaymentRecord[];
  subscriptions: Subscription[];
  onUpdateSubscriptionCost: (id: string, newCost: number) => Promise<void> | void;
}

export function usePriceHikeAlerts({
  payments,
  subscriptions,
  onUpdateSubscriptionCost,
}: UsePriceHikeAlertsParams) {
  const [dismissedIds, setDismissedIds] = useState<string[]>(() => loadDismissedIds());

  const priceHikeAlerts = useMemo<PriceHikeAlert[]>(() => {
    if (payments.length === 0 || subscriptions.length === 0) return [];

    const alerts: PriceHikeAlert[] = [];

    payments.forEach((payment) => {
      const sub = subscriptions.find((s) => s.id === payment.subscriptionId);
      if (!sub) return;

      const diff = payment.amount - sub.cost;
      const alertKey = `${sub.id}-${payment.amount.toFixed(2)}`;

      if (diff > 0.5 && !dismissedIds.includes(alertKey)) {
        if (!alerts.some((a) => a.subscriptionId === sub.id)) {
          const percentageIncrease = Math.round((diff / sub.cost) * 100);
          const annualDiff = sub.cycle === 'yearly' ? diff : diff * 12;

          alerts.push({
            id: alertKey,
            subscriptionId: sub.id,
            subscriptionName: sub.name,
            currency: sub.currency,
            oldCost: sub.cost,
            newCost: payment.amount,
            percentageIncrease,
            monthlyDifference: diff,
            annualDifference: annualDiff,
            sourceSubject: payment.sourceSubject,
            detectedAt: payment.paymentDate,
            status: 'pending',
          });
        }
      }
    });

    return alerts;
  }, [payments, subscriptions, dismissedIds]);

  const applyAlert = useCallback(
    async (alertId: string) => {
      const alert = priceHikeAlerts.find((a) => a.id === alertId);
      if (alert) {
        await onUpdateSubscriptionCost(alert.subscriptionId, alert.newCost);
        setDismissedIds((prev) => {
          const updated = [...prev, alertId];
          saveDismissedIds(updated);
          return updated;
        });
      }
    },
    [priceHikeAlerts, onUpdateSubscriptionCost]
  );

  const dismissAlert = useCallback((alertId: string) => {
    setDismissedIds((prev) => {
      const updated = [...prev, alertId];
      saveDismissedIds(updated);
      return updated;
    });
  }, []);

  return {
    priceHikeAlerts,
    applyPriceHike: applyAlert,
    dismissPriceHike: dismissAlert,
  };
}

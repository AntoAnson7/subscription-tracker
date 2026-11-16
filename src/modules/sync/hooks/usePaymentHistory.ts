import { useCallback, useState } from 'react';
import { PaymentRecord } from '@/modules/sync/types/sync.types';

const STORAGE_KEY = 'subwise-payment-records';
const LEGACY_STORAGE_KEY = 'subtrack-payment-records';

function loadPayments(): PaymentRecord[] {
  if (typeof window === 'undefined') return [];
  const raw = localStorage.getItem(STORAGE_KEY) ?? localStorage.getItem(LEGACY_STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as PaymentRecord[];
  } catch {
    return [];
  }
}

function savePayments(records: PaymentRecord[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

export function usePaymentHistory() {
  const [payments, setPayments] = useState<PaymentRecord[]>(() => loadPayments());

  const addPayment = useCallback((record: PaymentRecord) => {
    setPayments((prev) => {
      // Prevent duplicates by sourceMessageId
      if (prev.some((p) => p.sourceMessageId === record.sourceMessageId)) {
        return prev;
      }
      const updated = [record, ...prev];
      savePayments(updated);
      return updated;
    });
  }, []);

  const getPaymentsForSubscription = useCallback(
    (subscriptionId: string) => {
      return payments.filter((p) => p.subscriptionId === subscriptionId);
    },
    [payments]
  );

  return {
    payments,
    addPayment,
    getPaymentsForSubscription,
  };
}

import { useMemo } from 'react';
import { RunRateMetrics } from '@/modules/dashboard/types/dashboard.types';
import { Subscription } from '@/modules/subscriptions/types/subscription.types';

export function useRunRateMetrics(subscriptions: Subscription[]): RunRateMetrics {
  return useMemo(() => {
    const activeSubs = subscriptions.filter(
      (sub) => sub.status === 'active' || sub.status === 'trial'
    );

    const totalMonthlySpend = activeSubs.reduce((sum, sub) => sum + sub.monthlyEquivalent, 0);

    const totalAnnualSpend = totalMonthlySpend * 12;

    const sortedByDays = [...activeSubs].sort((a, b) => a.daysRemaining - b.daysRemaining);

    const nextBill = sortedByDays.length > 0 ? sortedByDays[0] : null;

    return {
      totalMonthlySpend,
      totalAnnualSpend,
      activeCount: activeSubs.length,
      nextBillName: nextBill ? nextBill.name : null,
      nextBillDays: nextBill ? nextBill.daysRemaining : null,
    };
  }, [subscriptions]);
}

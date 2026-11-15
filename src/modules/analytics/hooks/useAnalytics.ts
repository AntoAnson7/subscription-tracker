import { useEffect, useMemo, useState } from 'react';
import {
  generate12MonthCashflow,
  getAnalyticsSummary,
  getCategorySpendBreakdown,
  getTopExpenses,
} from '@/modules/analytics/utils/analytics.utils';
import { Subscription } from '@/modules/subscriptions/types/subscription.types';

export function useAnalytics(subscriptions: Subscription[]) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  const categoryBreakdown = useMemo(
    () => getCategorySpendBreakdown(subscriptions),
    [subscriptions]
  );

  const cashflow12Month = useMemo(() => generate12MonthCashflow(subscriptions), [subscriptions]);

  const topExpenses = useMemo(() => getTopExpenses(subscriptions, 5), [subscriptions]);

  const summary = useMemo(() => getAnalyticsSummary(subscriptions), [subscriptions]);

  return {
    categoryBreakdown,
    cashflow12Month,
    topExpenses,
    summary,
    prefersReducedMotion,
  };
}

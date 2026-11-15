import { useMemo } from 'react';
import { OptimizerSummary } from '@/modules/analytics/types/optimizer.types';
import { calculateSavingsOptimizer } from '@/modules/analytics/utils/savingsOptimizer.utils';
import { Subscription } from '@/modules/subscriptions/types/subscription.types';

export function useSavingsOptimizer(subscriptions: Subscription[]): OptimizerSummary {
  return useMemo(() => calculateSavingsOptimizer(subscriptions), [subscriptions]);
}

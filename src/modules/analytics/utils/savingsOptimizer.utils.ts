import { OptimizerSummary, SavingsOpportunity } from '@/modules/analytics/types/optimizer.types';
import { toMonthlyCost } from '@/modules/subscriptions/utils/normalization.utils';
import { Subscription } from '@/modules/subscriptions/types/subscription.types';

const ANNUAL_DISCOUNT_BENCHMARK = 10 / 12; // ~16.7% (2 months free industry standard)

export function calculateSavingsOptimizer(subscriptions: Subscription[]): OptimizerSummary {
  const switchable = subscriptions.filter(
    (s) => s.status === 'active' && (s.cycle === 'monthly' || s.cycle === 'weekly')
  );

  const opportunities: SavingsOpportunity[] = switchable.map((sub) => {
    const monthlyCost = toMonthlyCost(sub.cost, sub.cycle);
    const annualCost = monthlyCost * 12;
    const estimatedAnnualPlanCost = Math.round(annualCost * ANNUAL_DISCOUNT_BENCHMARK);
    const estimatedAnnualSavings = Math.round(annualCost - estimatedAnnualPlanCost);

    return {
      subscriptionId: sub.id,
      name: sub.name,
      iconSlug: sub.iconSlug,
      brandColor: sub.brandColor,
      currentMonthlyCost: monthlyCost,
      currentAnnualCost: annualCost,
      estimatedAnnualPlanCost,
      estimatedAnnualSavings,
      savingsPercentage: 17,
      currency: sub.currency,
      cancellationUrl: sub.cancellationUrl ?? null,
    };
  });

  opportunities.sort((a, b) => b.estimatedAnnualSavings - a.estimatedAnnualSavings);

  const totalPotentialAnnualSavings = opportunities.reduce(
    (sum, op) => sum + op.estimatedAnnualSavings,
    0
  );

  return {
    totalPotentialAnnualSavings,
    switchableCount: opportunities.length,
    opportunities,
  };
}

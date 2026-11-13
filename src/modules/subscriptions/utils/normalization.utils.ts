import { BillingCycle } from '@/modules/subscriptions/types/subscription.types';

export function toMonthlyCost(cost: number, cycle: BillingCycle): number {
  switch (cycle) {
    case 'weekly':
      return cost * (52 / 12);
    case 'monthly':
      return cost;
    case 'quarterly':
      return cost / 3;
    case 'semi_annually':
      return cost / 6;
    case 'yearly':
      return cost / 12;
    default:
      return cost;
  }
}

export function toAnnualCost(cost: number, cycle: BillingCycle): number {
  return toMonthlyCost(cost, cycle) * 12;
}

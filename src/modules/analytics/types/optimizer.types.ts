export interface SavingsOpportunity {
  subscriptionId: string;
  name: string;
  iconSlug: string | null;
  brandColor: string;
  currentMonthlyCost: number;
  currentAnnualCost: number;
  estimatedAnnualPlanCost: number;
  estimatedAnnualSavings: number;
  savingsPercentage: number;
  currency: string;
  cancellationUrl: string | null;
}

export interface OptimizerSummary {
  totalPotentialAnnualSavings: number;
  switchableCount: number;
  opportunities: SavingsOpportunity[];
}

import {
  Subscription,
  SubscriptionCategory,
} from '@/modules/subscriptions/types/subscription.types';

export interface CategorySpend {
  category: SubscriptionCategory;
  amount: number;
  percentage: number;
  count: number;
  color: string;
}

export interface MonthlyCashflow {
  monthKey: string;
  label: string;
  fullLabel: string;
  totalSpend: number;
  count: number;
}

export interface TopExpenseItem {
  subscription: Subscription;
  monthlyCost: number;
  percentageOfTotal: number;
}

export interface AnalyticsSummary {
  totalMonthlySpend: number;
  totalAnnualSpend: number;
  averagePerSubscription: number;
  activeCount: number;
  topCategory: { name: string; amount: number; percentage: number } | null;
  highestCostSub: { name: string; amount: number } | null;
}

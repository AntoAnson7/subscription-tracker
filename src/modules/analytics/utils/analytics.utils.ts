import {
  AnalyticsSummary,
  CategorySpend,
  MonthlyCashflow,
  TopExpenseItem,
} from '@/modules/analytics/types/analytics.types';
import { doesSubscriptionRenewOnDate } from '@/modules/calendar/utils/calendar.utils';
import {
  Subscription,
  SubscriptionCategory,
} from '@/modules/subscriptions/types/subscription.types';

export const CATEGORY_COLORS: Record<SubscriptionCategory, string> = {
  Entertainment: '#8B5CF6',
  'Productivity & AI': '#3B82F6',
  'Developer Tools': '#10B981',
  'Cloud & Hosting': '#06B6D4',
  'Design & Craft': '#EC4899',
  'Health & Fitness': '#F59E0B',
  'Bundled Services': '#6366F1',
  Utilities: '#64748B',
  Other: '#71717A',
};

export function getCategorySpendBreakdown(subscriptions: Subscription[]): CategorySpend[] {
  const activeSubs = subscriptions.filter((s) => s.status !== 'cancelled' && s.status !== 'paused');
  const totalSpend = activeSubs.reduce((acc, s) => acc + s.monthlyEquivalent, 0);

  const map = new Map<SubscriptionCategory, { amount: number; count: number }>();

  for (const sub of activeSubs) {
    const existing = map.get(sub.category) ?? { amount: 0, count: 0 };
    map.set(sub.category, {
      amount: existing.amount + sub.monthlyEquivalent,
      count: existing.count + 1,
    });
  }

  const result: CategorySpend[] = [];
  for (const [category, data] of map.entries()) {
    result.push({
      category,
      amount: data.amount,
      count: data.count,
      percentage: totalSpend > 0 ? Math.round((data.amount / totalSpend) * 100) : 0,
      color: CATEGORY_COLORS[category] || '#71717A',
    });
  }

  return result.sort((a, b) => b.amount - a.amount);
}

export function generate12MonthCashflow(
  subscriptions: Subscription[],
  startDate: Date = new Date()
): MonthlyCashflow[] {
  const activeSubs = subscriptions.filter((s) => s.status !== 'cancelled' && s.status !== 'paused');
  const cashflow: MonthlyCashflow[] = [];
  const baseYear = startDate.getFullYear();
  const baseMonth = startDate.getMonth();

  for (let i = 0; i < 12; i++) {
    const targetDate = new Date(baseYear, baseMonth + i, 1);
    const targetYear = targetDate.getFullYear();
    const targetMonth = targetDate.getMonth();
    const daysInMonth = new Date(targetYear, targetMonth + 1, 0).getDate();

    let monthSpend = 0;
    let renewalCount = 0;

    for (let day = 1; day <= daysInMonth; day++) {
      const cellDate = new Date(targetYear, targetMonth, day);
      for (const sub of activeSubs) {
        if (doesSubscriptionRenewOnDate(sub, cellDate)) {
          monthSpend += sub.cost;
          renewalCount += 1;
        }
      }
    }

    const shortLabel = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(targetDate);
    const yearShort = String(targetYear).slice(2);
    const fullLabel = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(
      targetDate
    );

    cashflow.push({
      monthKey: `${targetYear}-${String(targetMonth + 1).padStart(2, '0')}`,
      label: `${shortLabel} '${yearShort}`,
      fullLabel,
      totalSpend: monthSpend,
      count: renewalCount,
    });
  }

  return cashflow;
}

export function getTopExpenses(subscriptions: Subscription[], limit = 5): TopExpenseItem[] {
  const activeSubs = subscriptions.filter((s) => s.status !== 'cancelled' && s.status !== 'paused');
  const total = activeSubs.reduce((acc, s) => acc + s.monthlyEquivalent, 0);

  return [...activeSubs]
    .sort((a, b) => b.monthlyEquivalent - a.monthlyEquivalent)
    .slice(0, limit)
    .map((sub) => ({
      subscription: sub,
      monthlyCost: sub.monthlyEquivalent,
      percentageOfTotal: total > 0 ? Math.round((sub.monthlyEquivalent / total) * 100) : 0,
    }));
}

export function getAnalyticsSummary(subscriptions: Subscription[]): AnalyticsSummary {
  const activeSubs = subscriptions.filter((s) => s.status !== 'cancelled' && s.status !== 'paused');
  const totalMonthlySpend = activeSubs.reduce((acc, s) => acc + s.monthlyEquivalent, 0);
  const categories = getCategorySpendBreakdown(subscriptions);
  const topExpenses = getTopExpenses(subscriptions, 1);

  return {
    totalMonthlySpend,
    totalAnnualSpend: totalMonthlySpend * 12,
    averagePerSubscription:
      activeSubs.length > 0 ? Math.round(totalMonthlySpend / activeSubs.length) : 0,
    activeCount: activeSubs.length,
    topCategory:
      categories.length > 0
        ? {
            name: categories[0].category,
            amount: categories[0].amount,
            percentage: categories[0].percentage,
          }
        : null,
    highestCostSub:
      topExpenses.length > 0
        ? { name: topExpenses[0].subscription.name, amount: topExpenses[0].monthlyCost }
        : null,
  };
}

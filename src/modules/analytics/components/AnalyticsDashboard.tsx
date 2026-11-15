import { AnalyticsSummaryCards } from '@/modules/analytics/components/AnalyticsSummaryCards';
import { CashflowProjectionCard } from '@/modules/analytics/components/CashflowProjectionCard';
import { CategorySpendCard } from '@/modules/analytics/components/CategorySpendCard';
import { SavingsOptimizerCard } from '@/modules/analytics/components/SavingsOptimizerCard';
import { TopExpensesCard } from '@/modules/analytics/components/TopExpensesCard';
import { useAnalytics } from '@/modules/analytics/hooks/useAnalytics';
import { analyticsStyles } from '@/modules/analytics/recipes/analytics.recipe';
import { Subscription } from '@/modules/subscriptions/types/subscription.types';

interface AnalyticsDashboardProps {
  subscriptions: Subscription[];
}

export function AnalyticsDashboard({ subscriptions }: AnalyticsDashboardProps) {
  const classes = analyticsStyles();
  const { categoryBreakdown, cashflow12Month, topExpenses, summary, prefersReducedMotion } =
    useAnalytics(subscriptions);

  return (
    <section className={classes.root} aria-label="Subscription analytics dashboard">
      <AnalyticsSummaryCards summary={summary} />

      <div className={classes.gridTwoCol}>
        <CategorySpendCard
          categories={categoryBreakdown}
          prefersReducedMotion={prefersReducedMotion}
        />
        <TopExpensesCard topExpenses={topExpenses} />
      </div>

      <div className={classes.fullWidthCol}>
        <CashflowProjectionCard
          cashflow={cashflow12Month}
          prefersReducedMotion={prefersReducedMotion}
        />
      </div>

      <div className={classes.fullWidthCol}>
        <SavingsOptimizerCard subscriptions={subscriptions} />
      </div>
    </section>
  );
}

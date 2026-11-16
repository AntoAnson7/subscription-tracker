import { useCurrency } from '@/modules/common/hooks/useCurrency';
import { analyticsStyles } from '@/modules/analytics/recipes/analytics.recipe';
import { AnalyticsSummary } from '@/modules/analytics/types/analytics.types';

interface AnalyticsSummaryCardsProps {
  summary: AnalyticsSummary;
}

export function AnalyticsSummaryCards({ summary }: AnalyticsSummaryCardsProps) {
  const { format } = useCurrency();
  const classes = analyticsStyles();

  return (
    <div className={classes.summaryGrid}>
      <div className={classes.summaryCard}>
        <span className={classes.summaryLabel}>Monthly run-rate</span>
        <span className={classes.summaryValue}>{format(summary.totalMonthlySpend)}</span>
        <span className={classes.summarySub}>{summary.activeCount} active subscriptions</span>
      </div>

      <div className={classes.summaryCard}>
        <span className={classes.summaryLabel}>Annual projection</span>
        <span className={classes.summaryValue}>{format(summary.totalAnnualSpend)}</span>
        <span className={classes.summarySub}>Projected 12-month run</span>
      </div>

      <div className={classes.summaryCard}>
        <span className={classes.summaryLabel}>Average cost</span>
        <span className={classes.summaryValue}>{format(summary.averagePerSubscription)}</span>
        <span className={classes.summarySub}>Per subscription / month</span>
      </div>

      <div className={classes.summaryCard}>
        <span className={classes.summaryLabel}>Top category</span>
        <span className={classes.summaryValue}>
          {summary.topCategory ? summary.topCategory.name : '-'}
        </span>
        <span className={classes.summarySub}>
          {summary.topCategory
            ? `${format(summary.topCategory.amount)} / mo (${summary.topCategory.percentage}%)`
            : 'No active subscriptions'}
        </span>
      </div>
    </div>
  );
}

import { Calendar, Plus, Sparkles, TrendingUp } from 'lucide-react';
import { heroStyles } from '@/modules/dashboard/recipes/hero.recipe';
import { RunRateMetrics } from '@/modules/dashboard/types/dashboard.types';

interface RunRateHeroProps {
  metrics: RunRateMetrics;
  onAddClick: () => void;
  onLoadSampleData: () => void;
}

export function RunRateHero({ metrics, onAddClick, onLoadSampleData }: RunRateHeroProps) {
  const classes = heroStyles();

  return (
    <section className={classes.root}>
      <div className={classes.topRow}>
        <span className={classes.kpiLabel}>Monthly Commitment</span>
        <span className={classes.nextBillPill}>
          <TrendingUp size={13} />
          <span>Active: {metrics.activeCount}</span>
        </span>
      </div>

      <div className={classes.amountRow}>
        <span className={`${classes.amount} tabular-nums`}>
          ${metrics.totalMonthlySpend.toFixed(2)}
        </span>
        <span className={classes.perMonth}>/ month</span>
      </div>

      <div className={classes.annualRow}>
        <span className={`${classes.annualText} tabular-nums`}>
          <strong>${metrics.totalAnnualSpend.toFixed(2)}</strong> projected annually
        </span>

        {metrics.nextBillName && metrics.nextBillDays !== null && (
          <span className={classes.nextBillPill}>
            <Calendar size={13} />
            <span>
              Next: {metrics.nextBillName} in {metrics.nextBillDays}d
            </span>
          </span>
        )}
      </div>

      <div className={classes.actionsRow}>
        <button type="button" onClick={onAddClick} className={classes.primaryBtn}>
          <Plus size={16} />
          <span>Add Subscription</span>
        </button>

        <button type="button" onClick={onLoadSampleData} className={classes.secondaryBtn}>
          <Sparkles size={15} />
          <span>Sample Data</span>
        </button>
      </div>
    </section>
  );
}

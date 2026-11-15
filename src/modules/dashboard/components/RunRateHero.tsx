import { Calendar, Plus, TrendingUp } from 'lucide-react';
import { useCurrency } from '@/modules/common/hooks/useCurrency';
import { useFlipTransition } from '@/modules/dashboard/hooks/useFlipTransition';
import { heroStyles } from '@/modules/dashboard/recipes/hero.recipe';
import { RunRateMetrics } from '@/modules/dashboard/types/dashboard.types';

interface RunRateHeroProps {
  metrics: RunRateMetrics;
  onAddClick: () => void;
  isCompact?: boolean;
}

export function RunRateHero({ metrics, onAddClick, isCompact = false }: RunRateHeroProps) {
  const { format } = useCurrency();
  const classes = heroStyles({ isCompact });
  const btnRef = useFlipTransition<HTMLButtonElement>(isCompact);

  return (
    <section className={classes.root}>
      <div className={classes.contentWrapper}>
        <div className={classes.leftGroup}>
          <div className={classes.topRow}>
            <span className={classes.kpiLabel}>Monthly commitment</span>
            <div className={classes.activePillWrapper}>
              <span className={classes.nextBillPill}>
                <TrendingUp size={13} />
                <span>Active: {metrics.activeCount}</span>
              </span>
            </div>
          </div>

          <div className={classes.amountRow}>
            <span className={`${classes.amount} tabular-nums`}>
              {format(metrics.totalMonthlySpend)}
            </span>
            <span className={classes.perMonth}>/ month</span>
          </div>

          <div className={classes.annualCollapsible}>
            <div className={classes.annualInner}>
              <div className={classes.annualRow}>
                <span className={`${classes.annualText} tabular-nums`}>
                  <strong>{format(metrics.totalAnnualSpend)}</strong> projected annually
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
            </div>
          </div>
        </div>

        <div className={classes.actionsRow}>
          <button
            ref={btnRef}
            type="button"
            onClick={onAddClick}
            className={classes.primaryBtn}
            aria-label="Add subscription"
          >
            <Plus size={16} />
            <span>Add subscription</span>
          </button>
        </div>
      </div>
    </section>
  );
}

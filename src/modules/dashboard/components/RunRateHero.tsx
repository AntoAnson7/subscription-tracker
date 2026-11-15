import { Calendar, Plus, TrendingUp } from 'lucide-react';
import { css } from 'styled-system/css';
import { useCurrency } from '@/modules/common/hooks/useCurrency';
import { useFlipTransition } from '@/modules/dashboard/hooks/useFlipTransition';
import { annualStatsStyles } from '@/modules/dashboard/recipes/annualStats.recipe';
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
  const statClasses = annualStatsStyles();
  const btnRef = useFlipTransition<HTMLButtonElement>(isCompact);

  return (
    <section className={classes.root}>
      <div className={classes.contentWrapper}>
        <div className={classes.leftGroup}>
          <div className={classes.topRow}>
            <span className={classes.kpiLabel}>Monthly commitment</span>
            {!isCompact && (
              <span className={statClasses.pill}>
                <TrendingUp size={13} />
                <span>Active: {metrics.activeCount}</span>
              </span>
            )}
          </div>

          <div className={classes.amountRow}>
            <span className={`${classes.amount} tabular-nums`}>
              {format(metrics.totalMonthlySpend)}
            </span>
            <span className={classes.perMonth}>/ month</span>
          </div>

          <div className={classes.annualCollapsible}>
            <div style={{ overflow: 'hidden', minHeight: 0 }}>
              <div className={statClasses.row}>
                <span className={`${statClasses.text} tabular-nums`}>
                  <strong>{format(metrics.totalAnnualSpend)}</strong> projected annually
                </span>

                {metrics.nextBillName && metrics.nextBillDays !== null && (
                  <span className={statClasses.pill}>
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
            <Plus size={isCompact ? 14 : 16} />
            <span
              className={css({
                display: { base: isCompact ? 'none' : 'inline', sm: 'inline' },
              })}
            >
              Add subscription
            </span>
            {isCompact && (
              <span className={css({ display: { base: 'inline', sm: 'none' } })}>Add</span>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}

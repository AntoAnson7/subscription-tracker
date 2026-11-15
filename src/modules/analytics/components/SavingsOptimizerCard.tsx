import { ExternalLink, Sparkles, TrendingDown } from 'lucide-react';
import { useSavingsOptimizer } from '@/modules/analytics/hooks/useSavingsOptimizer';
import { savingsOptimizerStyles } from '@/modules/analytics/recipes/savingsOptimizer.recipe';
import { useCurrency } from '@/modules/common/hooks/useCurrency';
import { Subscription } from '@/modules/subscriptions/types/subscription.types';

interface SavingsOptimizerCardProps {
  subscriptions: Subscription[];
}

export function SavingsOptimizerCard({ subscriptions }: SavingsOptimizerCardProps) {
  const classes = savingsOptimizerStyles();
  const { totalPotentialAnnualSavings, switchableCount, opportunities } =
    useSavingsOptimizer(subscriptions);
  const { format } = useCurrency();

  if (switchableCount === 0) return null;

  return (
    <div className={classes.root}>
      <header className={classes.header}>
        <div className={classes.headerTop}>
          <div className={classes.headerIcon}>
            <Sparkles size={16} />
          </div>
          <h3 className={classes.headerTitle}>Annual Billing Optimizer</h3>
        </div>
        <p className={classes.headerDesc}>
          Most digital services offer 15%–20% discounts when billed annually instead of monthly.
        </p>
      </header>

      <div className={classes.savingsHero}>
        <div>
          <div className={classes.heroAmount}>{format(totalPotentialAnnualSavings)} /year</div>
          <div className={classes.heroSub}>
            Estimated potential savings across {switchableCount} monthly{' '}
            {switchableCount === 1 ? 'subscription' : 'subscriptions'}.
          </div>
        </div>
        <span className={classes.savingsBadge}>
          <TrendingDown size={12} style={{ display: 'inline', marginRight: '4px' }} />
          ~17% avg discount
        </span>
      </div>

      <div className={classes.list}>
        {opportunities.slice(0, 5).map((op) => (
          <div key={op.subscriptionId} className={classes.item}>
            <div className={classes.itemLeft}>
              <div className={classes.itemIcon} style={{ backgroundColor: op.brandColor }}>
                {op.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className={classes.itemName}>{op.name}</div>
                <div className={classes.itemSub}>Currently {format(op.currentMonthlyCost)}/mo</div>
              </div>
            </div>

            <div className={classes.itemRight}>
              <span className={classes.savingsBadge}>
                Save ~{format(op.estimatedAnnualSavings)}/yr
              </span>
              {op.cancellationUrl && (
                <a
                  href={op.cancellationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={classes.switchLink}
                  title="Open subscription management"
                >
                  <span>Switch</span>
                  <ExternalLink size={11} />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

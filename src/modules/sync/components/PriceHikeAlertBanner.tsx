import { ArrowUpRight, TrendingUp } from 'lucide-react';
import { useCurrency } from '@/modules/common/hooks/useCurrency';
import { priceHikeAlertStyles } from '@/modules/sync/recipes/priceHikeAlert.recipe';
import { PriceHikeAlert } from '@/modules/sync/types/priceHike.types';

interface PriceHikeAlertBannerProps {
  alerts: PriceHikeAlert[];
  onApply: (alertId: string) => Promise<void> | void;
  onDismiss: (alertId: string) => void;
}

export function PriceHikeAlertBanner({ alerts, onApply, onDismiss }: PriceHikeAlertBannerProps) {
  const classes = priceHikeAlertStyles();
  const { format } = useCurrency();

  if (alerts.length === 0) return null;

  return (
    <div className={classes.bannerList}>
      {alerts.map((alert) => (
        <div key={alert.id} className={classes.banner}>
          <div className={classes.bannerLeft}>
            <div className={classes.iconWrapper}>
              <TrendingUp size={16} />
            </div>
            <div className={classes.textContent}>
              <div className={classes.heading}>
                Price hike detected: <strong>{alert.subscriptionName}</strong> (+
                {alert.percentageIncrease}%)
              </div>
              <div className={classes.subtext}>
                Increased from {format(alert.oldCost)} to {format(alert.newCost)}. Impact: +
                {format(alert.annualDifference)}/yr on your annual run-rate.
              </div>
            </div>
          </div>

          <div className={classes.actionsRow}>
            <button type="button" onClick={() => onApply(alert.id)} className={classes.updateBtn}>
              <ArrowUpRight size={13} />
              <span>Update to {format(alert.newCost)}</span>
            </button>
            <button
              type="button"
              onClick={() => onDismiss(alert.id)}
              className={classes.dismissBtn}
            >
              Dismiss
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

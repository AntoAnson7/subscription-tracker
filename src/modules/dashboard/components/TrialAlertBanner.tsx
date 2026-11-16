import { AlertTriangle, ExternalLink } from 'lucide-react';
import { sanitizeUrl } from '@/modules/common/utils/url.utils';
import { trialAlertStyles } from '@/modules/dashboard/recipes/trialAlert.recipe';
import { Subscription } from '@/modules/subscriptions/types/subscription.types';

interface TrialAlertBannerProps {
  trialSubscription: Subscription | null;
}

export function TrialAlertBanner({ trialSubscription }: TrialAlertBannerProps) {
  const classes = trialAlertStyles();

  if (!trialSubscription) return null;

  const safeUrl = sanitizeUrl(trialSubscription.cancellationUrl);

  return (
    <aside className={classes.root} role="alert">
      <div className={classes.contentWrapper}>
        <AlertTriangle size={20} className={classes.icon} />
        <div className={classes.textWrapper}>
          <strong className={classes.title}>
            Free trial expiring in {trialSubscription.daysRemaining} days
          </strong>
          <span className={classes.subtitle}>
            {trialSubscription.name} will renew for ${trialSubscription.cost.toFixed(2)}/
            {trialSubscription.cycle} on {trialSubscription.renewalDate}.
          </span>
        </div>
      </div>

      {safeUrl && (
        <a href={safeUrl} target="_blank" rel="noopener noreferrer" className={classes.actionLink}>
          Manage trial <ExternalLink size={12} style={{ display: 'inline' }} />
        </a>
      )}
    </aside>
  );
}

import { AlertTriangle } from 'lucide-react';
import { paymentDrawerStyles } from '@/modules/sync/recipes/paymentDrawer.recipe';
import { CancellationAlert } from '@/modules/sync/types/sync.types';

interface CancellationAlertBannerProps {
  alerts: CancellationAlert[];
  onConfirm: (id: string) => Promise<void> | void;
  onDismiss: (id: string) => void;
}

export function CancellationAlertBanner({
  alerts,
  onConfirm,
  onDismiss,
}: CancellationAlertBannerProps) {
  const classes = paymentDrawerStyles();
  const pendingAlerts = alerts.filter((a) => a.status === 'pending');

  if (pendingAlerts.length === 0) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
      {pendingAlerts.map((alert) => (
        <div key={alert.id} className={classes.alertBanner}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <AlertTriangle size={16} color="var(--colors-status-warning)" />
            <span className={classes.alertText}>
              Cancellation email detected for <strong>{alert.subscriptionName}</strong> (
              {alert.sourceSubject}).
            </span>
          </div>
          <div className={classes.alertActions}>
            <button
              type="button"
              onClick={() => onConfirm(alert.id)}
              className={classes.confirmBtn}
            >
              Confirm cancel
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

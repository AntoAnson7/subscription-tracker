import { ExternalLink, Pencil, RotateCcw } from 'lucide-react';
import { StatusBadge } from '@/modules/common/components/StatusBadge';
import { useCurrency } from '@/modules/common/hooks/useCurrency';
import { formatDisplayDate } from '@/modules/common/utils/date.utils';
import { getBrandIconUrl } from '@/modules/common/utils/icons.utils';
import { subscriptionTableStyles } from '@/modules/subscriptions/recipes/subscriptionTable.recipe';
import { Subscription } from '@/modules/subscriptions/types/subscription.types';

interface SubscriptionTableProps {
  subscriptions: Subscription[];
  onEdit?: (subscription: Subscription) => void;
  onCancel?: (id: string) => void;
  onRenew?: (subscription: Subscription) => void;
}

export function SubscriptionTable({
  subscriptions,
  onEdit,
  onCancel,
  onRenew,
}: SubscriptionTableProps) {
  const { format } = useCurrency();
  const classes = subscriptionTableStyles();

  return (
    <div className={classes.root}>
      <table className={classes.table}>
        <thead className={classes.thead}>
          <tr>
            <th className={classes.th}>Service</th>
            <th className={classes.th}>Category</th>
            <th className={classes.th}>Cost</th>
            <th className={classes.th}>Cycle</th>
            <th className={classes.th}>Monthly equiv.</th>
            <th className={classes.th}>Next renewal</th>
            <th className={classes.th}>Status</th>
            <th className={classes.th}>Action</th>
          </tr>
        </thead>
        <tbody>
          {subscriptions.map((sub) => {
            const iconUrl = getBrandIconUrl(sub.iconSlug, sub.websiteUrl);

            return (
              <tr key={sub.id} className={classes.tr}>
                <td className={classes.td}>
                  <div className={classes.brandCell}>
                    {iconUrl ? (
                      <img src={iconUrl} alt={sub.name} width={20} height={20} />
                    ) : (
                      <span>{sub.name.slice(0, 2).toUpperCase()}</span>
                    )}
                    <strong>{sub.name}</strong>
                  </div>
                </td>
                <td className={classes.td}>{sub.category}</td>
                <td className={`${classes.td} tabular-nums`}>{format(sub.cost)}</td>
                <td className={classes.td}>{sub.cycle}</td>
                <td className={`${classes.td} tabular-nums`}>
                  <strong>{format(sub.monthlyEquivalent)}</strong>
                </td>
                <td className={`${classes.td} tabular-nums`}>
                  {formatDisplayDate(sub.renewalDate)}
                </td>
                <td className={classes.td}>
                  <StatusBadge status={sub.status} />
                </td>
                <td className={classes.td}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {sub.status === 'cancelled' && onRenew ? (
                      <button
                        type="button"
                        onClick={() => onRenew(sub)}
                        className={classes.manageLink}
                        aria-label={`Renew ${sub.name}`}
                      >
                        <RotateCcw size={11} />
                        <span>Renew</span>
                      </button>
                    ) : null}
                    {sub.status !== 'cancelled' && onCancel ? (
                      <button
                        type="button"
                        onClick={() => onCancel(sub.id)}
                        className={classes.manageLink}
                        aria-label={`Cancel ${sub.name}`}
                      >
                        <span>Cancel</span>
                      </button>
                    ) : null}
                    {onEdit && (
                      <button
                        type="button"
                        onClick={() => onEdit(sub)}
                        className={classes.manageLink}
                        aria-label={`Edit ${sub.name}`}
                      >
                        <Pencil size={11} />
                        <span>Edit</span>
                      </button>
                    )}
                    {sub.cancellationUrl ? (
                      <a
                        href={sub.cancellationUrl}
                        target="_blank"
                        rel="noreferrer"
                        className={classes.manageLink}
                      >
                        <span>Manage</span>
                        <ExternalLink size={12} />
                      </a>
                    ) : !onEdit && !onCancel && !onRenew ? (
                      <span>—</span>
                    ) : null}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

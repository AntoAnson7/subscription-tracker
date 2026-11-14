import { ExternalLink } from 'lucide-react';
import { StatusBadge } from '@/modules/common/components/StatusBadge';
import { useCurrency } from '@/modules/common/hooks/useCurrency';
import { getBrandIconUrl } from '@/modules/common/utils/icons.utils';
import { subscriptionTableStyles } from '@/modules/subscriptions/recipes/subscriptionTable.recipe';
import { Subscription } from '@/modules/subscriptions/types/subscription.types';

interface SubscriptionTableProps {
  subscriptions: Subscription[];
}

export function SubscriptionTable({ subscriptions }: SubscriptionTableProps) {
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
            <th className={classes.th}>Monthly Equiv.</th>
            <th className={classes.th}>Next Renewal</th>
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
                  {sub.renewalDate} ({sub.daysRemaining}d)
                </td>
                <td className={classes.td}>
                  <StatusBadge status={sub.status} />
                </td>
                <td className={classes.td}>
                  {sub.cancellationUrl ? (
                    <a
                      href={sub.cancellationUrl}
                      target="_blank"
                      rel="noreferrer"
                      className={classes.manageLink}
                    >
                      Manage <ExternalLink size={12} style={{ display: 'inline' }} />
                    </a>
                  ) : (
                    <span>—</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

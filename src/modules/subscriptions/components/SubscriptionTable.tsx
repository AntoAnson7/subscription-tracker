import { StatusBadge } from '@/modules/common/components/StatusBadge';
import { useCurrency } from '@/modules/common/hooks/useCurrency';
import { formatDisplayDate } from '@/modules/common/utils/date.utils';
import { getBrandIconUrl } from '@/modules/common/utils/icons.utils';
import { SubscriptionCardMenu } from '@/modules/subscriptions/components/SubscriptionCardMenu';
import { subscriptionTableStyles } from '@/modules/subscriptions/recipes/subscriptionTable.recipe';
import { Subscription } from '@/modules/subscriptions/types/subscription.types';

interface SubscriptionTableProps {
  subscriptions: Subscription[];
  onEdit?: (subscription: Subscription) => void;
  onCancel?: (id: string) => void;
  onRenew?: (subscription: Subscription) => void;
  onDelete?: (id: string) => void;
}

const familyPillStyle = {
  fontSize: '10px',
  fontWeight: 700,
  padding: '1px 6px',
  borderRadius: '9999px',
  background: 'var(--colors-accent-subtle)',
  color: 'var(--colors-accent-primary)',
  border: '1px solid var(--colors-accent-border)',
  whiteSpace: 'nowrap',
  flexShrink: 0,
} as const;

const totalSubStyle = {
  display: 'block',
  fontSize: '10px',
  color: 'var(--colors-text-tertiary)',
} as const;

export function SubscriptionTable({
  subscriptions,
  onEdit,
  onCancel,
  onRenew,
  onDelete,
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
            <th className={classes.thAction}>Actions</th>
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
                    {sub.isFamily && (
                      <span style={familyPillStyle}>Shared ({sub.splitCount ?? 2})</span>
                    )}
                  </div>
                </td>
                <td className={classes.td}>{sub.category}</td>
                <td className={`${classes.td} tabular-nums`}>
                  {format(sub.cost)}
                  {sub.isFamily && (
                    <span style={totalSubStyle}>
                      Total {format(sub.totalCost ?? sub.cost * (sub.splitCount ?? 2))}
                    </span>
                  )}
                </td>
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
                <td className={classes.tdAction}>
                  <div style={{ display: 'inline-flex', justifyContent: 'flex-end' }}>
                    <SubscriptionCardMenu
                      subscription={sub}
                      onEdit={onEdit}
                      onCancel={onCancel}
                      onRenew={onRenew}
                      onDelete={onDelete}
                      placement="bottom"
                    />
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

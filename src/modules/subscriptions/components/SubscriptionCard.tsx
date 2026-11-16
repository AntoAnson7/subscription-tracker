import { RotateCcw, Users } from 'lucide-react';
import { css } from 'styled-system/css';
import { StatusBadge } from '@/modules/common/components/StatusBadge';
import { useCurrency } from '@/modules/common/hooks/useCurrency';
import { formatDisplayDate } from '@/modules/common/utils/date.utils';
import { getBrandIconUrl } from '@/modules/common/utils/icons.utils';
import { SubscriptionCardMenu } from '@/modules/subscriptions/components/SubscriptionCardMenu';
import { sharedSubscriptionCardStyles } from '@/modules/subscriptions/recipes/sharedSubscriptionCard.recipe';
import { subscriptionCardStyles } from '@/modules/subscriptions/recipes/subscriptionCard.recipe';
import { Subscription } from '@/modules/subscriptions/types/subscription.types';

interface SubscriptionCardProps {
  subscription: Subscription;
  onEdit?: (subscription: Subscription) => void;
  onCancel?: (id: string) => void;
  onRenew?: (subscription: Subscription) => void;
  onDelete?: (id: string) => void;
}

export function SubscriptionCard({
  subscription,
  onEdit,
  onCancel,
  onRenew,
  onDelete,
}: SubscriptionCardProps) {
  const { format } = useCurrency();
  const isCancelled = subscription.status === 'cancelled';
  const classes = subscriptionCardStyles({ isCancelled });
  const sharedClasses = sharedSubscriptionCardStyles();
  const iconUrl = getBrandIconUrl(subscription.iconSlug, subscription.websiteUrl);
  const isUrgent = subscription.daysRemaining <= 3;
  const isSoon = subscription.daysRemaining <= 7 && !isUrgent;

  const renewalColor = isCancelled
    ? '#71717A'
    : isUrgent
      ? '#EF4444'
      : isSoon
        ? '#F59E0B'
        : '#27272A';
  const shouldInvert =
    subscription.iconSlug === 'apple' ||
    subscription.iconSlug === 'openai' ||
    subscription.iconSlug === 'github';

  const planTotal = subscription.totalCost ?? subscription.cost * (subscription.splitCount ?? 2);

  return (
    <article className={classes.root}>
      <div>
        <div className={classes.header}>
          <div className={classes.brandWrapper}>
            <div className={classes.iconBox}>
              {iconUrl ? (
                <img
                  src={iconUrl}
                  alt={`${subscription.name} logo`}
                  width={22}
                  height={22}
                  className={css({ _dark: { filter: shouldInvert ? 'invert(1)' : 'none' } })}
                />
              ) : (
                <span>{subscription.name.slice(0, 2).toUpperCase()}</span>
              )}
            </div>
            <div>
              <h3 className={classes.title}>{subscription.name}</h3>
              <span className={classes.category}>{subscription.category}</span>
            </div>
          </div>
          <div className={sharedClasses.badgeGroup}>
            {subscription.isFamily && (
              <div className={sharedClasses.badge}>
                <Users size={11} />
                <span>Family ({subscription.splitCount ?? 2})</span>
              </div>
            )}
            <StatusBadge status={subscription.status} />
          </div>
        </div>

        <div className={classes.priceSection}>
          {subscription.isFamily && (
            <div className={sharedClasses.shareTag}>Your tracked share</div>
          )}
          <div className={classes.priceRow}>
            <span className={`${classes.price} tabular-nums`}>{format(subscription.cost)}</span>
            <span className={classes.cycle}>/{subscription.cycle}</span>
          </div>
          {subscription.isFamily && (
            <div className={sharedClasses.breakdown}>
              <div className={sharedClasses.breakdownRow}>
                <Users size={12} />
                <span>
                  Total: <strong>{format(planTotal)}</strong>/{subscription.cycle}
                </span>
              </div>
              <span className={sharedClasses.breakdownSub}>
                Split {subscription.splitCount ?? 2} ways ({format(subscription.cost)} each)
              </span>
            </div>
          )}
          {subscription.cycle === 'yearly' && (
            <p className={classes.normalizedText}>
              Normalized to{' '}
              <strong className="tabular-nums">{format(subscription.monthlyEquivalent)}/mo</strong>
            </p>
          )}
        </div>
      </div>

      <div className={classes.footer}>
        <div>
          <span className={classes.renewalLabel}>{isCancelled ? 'Ended' : 'Renewal'}</span>
          <span style={{ color: renewalColor }} className={`${classes.renewalValue} tabular-nums`}>
            {formatDisplayDate(subscription.renewalDate)}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {isCancelled && onRenew ? (
            <button
              type="button"
              onClick={() => onRenew(subscription)}
              className={classes.renewBtn}
              aria-label={`Renew ${subscription.name}`}
            >
              <RotateCcw size={12} />
              <span>Renew</span>
            </button>
          ) : null}

          <SubscriptionCardMenu
            subscription={subscription}
            onEdit={onEdit}
            onCancel={onCancel}
            onRenew={onRenew}
            onDelete={onDelete}
          />
        </div>
      </div>
    </article>
  );
}

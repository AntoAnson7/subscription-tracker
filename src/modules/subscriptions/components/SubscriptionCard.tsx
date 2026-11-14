import { ExternalLink } from 'lucide-react';
import { css } from 'styled-system/css';
import { StatusBadge } from '@/modules/common/components/StatusBadge';
import { useCurrency } from '@/modules/common/hooks/useCurrency';
import { getBrandIconUrl } from '@/modules/common/utils/icons.utils';
import { subscriptionCardStyles } from '@/modules/subscriptions/recipes/subscriptionCard.recipe';
import { Subscription } from '@/modules/subscriptions/types/subscription.types';

interface SubscriptionCardProps {
  subscription: Subscription;
}

export function SubscriptionCard({ subscription }: SubscriptionCardProps) {
  const { format } = useCurrency();
  const classes = subscriptionCardStyles();
  const iconUrl = getBrandIconUrl(subscription.iconSlug, subscription.websiteUrl);
  const isUrgent = subscription.daysRemaining <= 3;
  const isSoon = subscription.daysRemaining <= 7 && !isUrgent;

  const renewalColor = isUrgent ? '#EF4444' : isSoon ? '#F59E0B' : '#27272A';

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
                  className={css({
                    _dark: {
                      filter:
                        subscription.iconSlug === 'apple' ||
                        subscription.iconSlug === 'openai' ||
                        subscription.iconSlug === 'github'
                          ? 'invert(1)'
                          : 'none',
                    },
                  })}
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
          <StatusBadge status={subscription.status} />
        </div>

        <div className={classes.priceSection}>
          <div className={classes.priceRow}>
            <span className={`${classes.price} tabular-nums`}>{format(subscription.cost)}</span>
            <span className={classes.cycle}>/{subscription.cycle}</span>
          </div>
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
          <span className={classes.renewalLabel}>Renewal</span>
          <span style={{ color: renewalColor }} className={`${classes.renewalValue} tabular-nums`}>
            {subscription.renewalDate} ({subscription.daysRemaining}d)
          </span>
        </div>

        {subscription.cancellationUrl && (
          <a
            href={subscription.cancellationUrl}
            target="_blank"
            rel="noreferrer"
            className={classes.manageBtn}
          >
            <span>Manage</span>
            <ExternalLink size={12} />
          </a>
        )}
      </div>
    </article>
  );
}

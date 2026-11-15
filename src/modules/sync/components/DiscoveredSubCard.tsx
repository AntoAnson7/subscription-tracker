import { useCurrency } from '@/modules/common/hooks/useCurrency';
import { getBrandIconUrl } from '@/modules/common/utils/icons.utils';
import { syncCardStyles } from '@/modules/sync/recipes/syncCard.recipe';
import { DiscoveredSubscription } from '@/modules/sync/types/sync.types';

interface DiscoveredSubCardProps {
  item: DiscoveredSubscription;
  onToggle: (id: string) => void;
}

export function DiscoveredSubCard({ item, onToggle }: DiscoveredSubCardProps) {
  const classes = syncCardStyles();
  const { format } = useCurrency();
  const iconUrl = getBrandIconUrl(item.iconSlug, null);
  const isDarkSvg =
    item.iconSlug === 'apple' || item.iconSlug === 'openai' || item.iconSlug === 'github';

  return (
    <label className={classes.card} style={{ cursor: 'pointer' }}>
      <div className={classes.cardLeft}>
        <input type="checkbox" checked={item.isSelected} onChange={() => onToggle(item.id)} />
        <div
          className={classes.iconBox}
          style={{ backgroundColor: `${item.brandColor}18`, color: item.brandColor }}
        >
          {iconUrl ? (
            <img
              src={iconUrl}
              alt=""
              width={20}
              height={20}
              style={{ filter: isDarkSvg ? 'var(--brand-icon-filter, none)' : 'none' }}
            />
          ) : (
            <span style={{ fontSize: '13px', fontWeight: '700' }}>
              {item.name.slice(0, 2).toUpperCase()}
            </span>
          )}
        </div>
        <div>
          <h4>{item.name}</h4>
          <p>
            {item.category} • Renews {item.renewalDate}
          </p>
        </div>
      </div>

      <div className={classes.cardRight}>
        <div>{format(item.cost)}</div>
        <span>/ {item.cycle}</span>
      </div>
    </label>
  );
}

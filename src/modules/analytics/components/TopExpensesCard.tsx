import { useCurrency } from '@/modules/common/hooks/useCurrency';
import { getBrandIconUrl } from '@/modules/common/utils/icons.utils';
import { chartCardStyles } from '@/modules/analytics/recipes/chartCard.recipe';
import { topExpenseItemStyles } from '@/modules/analytics/recipes/topExpenseItem.recipe';
import { TopExpenseItem } from '@/modules/analytics/types/analytics.types';

interface TopExpensesCardProps {
  topExpenses: TopExpenseItem[];
}

export function TopExpensesCard({ topExpenses }: TopExpensesCardProps) {
  const { format } = useCurrency();
  const cardClasses = chartCardStyles();
  const itemClasses = topExpenseItemStyles();

  if (topExpenses.length === 0) {
    return (
      <div className={cardClasses.card}>
        <div className={cardClasses.header}>
          <div className={cardClasses.titleGroup}>
            <h3 className={cardClasses.title}>Top expenses</h3>
            <span className={cardClasses.subtitle}>Highest monthly costs ranked</span>
          </div>
        </div>
        <div className={cardClasses.emptyState}>No subscriptions to rank</div>
      </div>
    );
  }

  return (
    <div className={cardClasses.card}>
      <div className={cardClasses.header}>
        <div className={cardClasses.titleGroup}>
          <h3 className={cardClasses.title}>Top expenses</h3>
          <span className={cardClasses.subtitle}>Highest monthly costs ranked</span>
        </div>
        <span className={cardClasses.badge}>Top {topExpenses.length}</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {topExpenses.map((item, index) => {
          const sub = item.subscription;
          const iconUrl = getBrandIconUrl(sub.iconSlug, sub.websiteUrl);
          const shouldInvert =
            sub.iconSlug === 'apple' || sub.iconSlug === 'openai' || sub.iconSlug === 'github';

          return (
            <div key={sub.id} className={itemClasses.root}>
              <div
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
              >
                <div className={itemClasses.leftGroup}>
                  <span className={itemClasses.rankBox}>#{index + 1}</span>
                  <div
                    className={itemClasses.iconBox}
                    style={{ backgroundColor: sub.brandColor || '#27272A' }}
                  >
                    {iconUrl ? (
                      <img
                        src={iconUrl}
                        alt=""
                        style={{
                          width: '18px',
                          height: '18px',
                          objectFit: 'contain',
                          filter: shouldInvert ? 'invert(1)' : 'none',
                        }}
                      />
                    ) : (
                      <span style={{ fontSize: '13px', fontWeight: 700, color: '#FFF' }}>
                        {sub.name[0]}
                      </span>
                    )}
                  </div>
                  <div className={itemClasses.info}>
                    <span className={itemClasses.name}>{sub.name}</span>
                    <span className={itemClasses.category}>{sub.category}</span>
                  </div>
                </div>

                <div className={itemClasses.rightGroup}>
                  <span className={itemClasses.cost}>{format(item.monthlyCost)}</span>
                  <span className={itemClasses.percent}>{item.percentageOfTotal}% of total</span>
                </div>
              </div>

              <div className={itemClasses.barWrapper}>
                <div
                  className={itemClasses.barFill}
                  style={{ width: `${Math.min(100, Math.max(5, item.percentageOfTotal))}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

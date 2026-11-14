import { skeletonStyles } from '@/modules/common/recipes/skeleton.recipe';

export function SubscriptionCardSkeleton() {
  const classes = skeletonStyles();

  return (
    <article
      role="status"
      aria-label="Loading subscription details"
      aria-busy="true"
      className={classes.card}
    >
      <div>
        <div className={classes.cardHeader}>
          <div className={classes.cardTitleGroup}>
            <div
              className={`${classes.bone} skeleton-shimmer`}
              style={{ width: '42px', height: '42px', borderRadius: '12px' }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div
                className={`${classes.bone} skeleton-shimmer`}
                style={{ width: '120px', height: '18px', borderRadius: '6px' }}
              />
              <div
                className={`${classes.bone} skeleton-shimmer`}
                style={{ width: '70px', height: '12px', borderRadius: '6px' }}
              />
            </div>
          </div>
          <div
            className={`${classes.pill} skeleton-shimmer`}
            style={{ width: '64px', height: '22px' }}
          />
        </div>

        <div className={classes.cardPriceGroup}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <div
              className={`${classes.bone} skeleton-shimmer`}
              style={{ width: '100px', height: '28px', borderRadius: '8px' }}
            />
            <div
              className={`${classes.bone} skeleton-shimmer`}
              style={{ width: '48px', height: '16px', borderRadius: '6px' }}
            />
          </div>
        </div>
      </div>

      <div className={classes.cardFooter}>
        <div
          className={`${classes.bone} skeleton-shimmer`}
          style={{ width: '96px', height: '14px', borderRadius: '6px' }}
        />
        <div
          className={`${classes.pill} skeleton-shimmer`}
          style={{ width: '56px', height: '24px' }}
        />
      </div>
    </article>
  );
}

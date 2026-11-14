import { skeletonStyles } from '@/modules/common/recipes/skeleton.recipe';

export function RunRateHeroSkeleton() {
  const classes = skeletonStyles();

  return (
    <section
      role="status"
      aria-label="Loading run-rate metrics"
      aria-busy="true"
      className={classes.hero}
    >
      <div className={classes.heroTop}>
        <div
          className={`${classes.bone} skeleton-shimmer`}
          style={{ width: '150px', height: '16px' }}
        />
        <div
          className={`${classes.pill} skeleton-shimmer`}
          style={{ width: '90px', height: '24px' }}
        />
      </div>

      <div className={classes.heroAmount}>
        <div
          className={`${classes.bone} skeleton-shimmer`}
          style={{ width: '240px', height: '52px', borderRadius: '14px' }}
        />
        <div
          className={`${classes.bone} skeleton-shimmer`}
          style={{ width: '70px', height: '22px' }}
        />
      </div>

      <div className={classes.heroSub}>
        <div
          className={`${classes.bone} skeleton-shimmer`}
          style={{ width: '260px', height: '16px' }}
        />
        <div
          className={`${classes.pill} skeleton-shimmer`}
          style={{ width: '130px', height: '24px' }}
        />
      </div>

      <div className={classes.heroPills}>
        <div
          className={`${classes.pill} skeleton-shimmer`}
          style={{ width: '160px', height: '38px' }}
        />
      </div>
    </section>
  );
}

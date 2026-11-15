import { skeletonStyles } from '@/modules/common/recipes/skeleton.recipe';

interface RunRateHeroSkeletonProps {
  isCompact?: boolean;
}

export function RunRateHeroSkeleton({ isCompact = false }: RunRateHeroSkeletonProps) {
  const classes = skeletonStyles();

  if (isCompact) {
    return (
      <section
        role="status"
        aria-label="Loading run-rate metrics"
        aria-busy="true"
        className={classes.hero}
        style={{
          padding: '16px 20px',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div
            className={`${classes.bone} skeleton-shimmer`}
            style={{ width: '130px', height: '14px' }}
          />
          <div
            className={`${classes.bone} skeleton-shimmer`}
            style={{ width: '180px', height: '28px', borderRadius: '8px' }}
          />
        </div>
        <div
          className={`${classes.pill} skeleton-shimmer`}
          style={{ width: '140px', height: '36px', borderRadius: '9999px' }}
        />
      </section>
    );
  }

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

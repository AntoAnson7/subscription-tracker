import { skeletonStyles } from '@/modules/common/recipes/skeleton.recipe';

export function HeaderAvatarSkeleton() {
  const classes = skeletonStyles();

  return (
    <div
      role="status"
      aria-label="Loading user profile"
      aria-busy="true"
      className={`${classes.circle} skeleton-shimmer`}
      style={{ width: '34px', height: '34px' }}
    >
      <span className="sr-only">Loading user profile...</span>
    </div>
  );
}

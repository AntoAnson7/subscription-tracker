import { appleStoriesStyles } from '@/modules/landing/recipes/appleStories.recipe';
import { AppleStory } from '@/modules/landing/types/landing.types';

interface AppleStoryCardProps {
  story: AppleStory;
}

export function AppleStoryCard({ story }: AppleStoryCardProps) {
  const classes = appleStoriesStyles();

  return (
    <article className={classes.card}>
      <div className={classes.cardContent}>
        <span className={classes.cardEyebrow}>{story.eyebrow}</span>
        <h3 className={classes.cardHeadline}>{story.headline}</h3>
        <p className={classes.cardDesc}>{story.description}</p>
      </div>

      {story.statValue && (
        <div className={classes.statBadge}>
          <span className={classes.statNum}>{story.statValue}</span>
          <span className={classes.statSub}>{story.statLabel}</span>
        </div>
      )}
    </article>
  );
}

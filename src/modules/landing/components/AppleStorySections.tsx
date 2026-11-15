import { AppleStoryCard } from '@/modules/landing/components/AppleStoryCard';
import { appleStoriesStyles } from '@/modules/landing/recipes/appleStories.recipe';
import { APPLE_STORIES } from '@/modules/landing/utils/appleStories.data';

export function AppleStorySections() {
  const classes = appleStoriesStyles();

  return (
    <section id="features" className={classes.section}>
      <div className={classes.container}>
        <div className={classes.header}>
          <span className={classes.sectionEyebrow}>Intelligence</span>
          <h2 className={classes.sectionHeadline}>Precision tools for recurring expenses.</h2>
        </div>

        <div className={classes.grid}>
          {APPLE_STORIES.map((story) => (
            <AppleStoryCard key={story.id} story={story} />
          ))}
        </div>
      </div>
    </section>
  );
}

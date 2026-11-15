import { LandingFeatureCard } from '@/modules/landing/components/LandingFeatureCard';
import { landingFeaturesStyles } from '@/modules/landing/recipes/landingFeatures.recipe';
import { LANDING_FEATURES } from '@/modules/landing/utils/landingFeatures.data';

export function LandingFeatureShowcase() {
  const classes = landingFeaturesStyles();

  return (
    <section id="features" className={classes.section}>
      <div className={classes.header}>
        <div className={classes.tag}>Superpowers</div>
        <h2 className={classes.title}>Everything You Need to Master Your Recurring Spend.</h2>
        <p className={classes.subtitle}>
          SubTrack puts you back in the driver&apos;s seat with automated receipt tracking, stealth
          price hike alerts, and proactive cancellation shields.
        </p>
      </div>

      <div className={classes.grid}>
        {LANDING_FEATURES.map((feature) => (
          <LandingFeatureCard key={feature.id} feature={feature} />
        ))}
      </div>
    </section>
  );
}

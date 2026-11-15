import { ChevronRight } from 'lucide-react';
import { appleHeroStyles } from '@/modules/landing/recipes/appleHero.recipe';

interface AppleHeroProps {
  onOpenAuth: () => void;
  onLaunchApp: () => void;
}

export function AppleHero({ onOpenAuth, onLaunchApp }: AppleHeroProps) {
  const classes = appleHeroStyles();

  return (
    <section id="overview" className={classes.section}>
      <span className={classes.eyebrow}>SubTrack</span>

      <h1 className={classes.headline}>
        Your subscriptions.
        <br />
        Seen clearly.
      </h1>

      <p className={classes.subheadline}>
        Automatically track recurring costs from receipts, detect stealth price hikes, and uncover
        annual savings. Private by design.
      </p>

      <div className={classes.ctaRow}>
        <button type="button" onClick={onOpenAuth} className={classes.primaryBtn}>
          Start tracking free
        </button>

        <button type="button" onClick={onLaunchApp} className={classes.linkCta}>
          <span>Explore live demo</span>
          <ChevronRight size={14} />
        </button>
      </div>
    </section>
  );
}

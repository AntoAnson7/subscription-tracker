import { appleCtaStyles } from '@/modules/landing/recipes/appleCta.recipe';

interface AppleCtaProps {
  onOpenAuth: () => void;
  onLaunchApp: () => void;
}

export function AppleCta({ onOpenAuth, onLaunchApp }: AppleCtaProps) {
  const classes = appleCtaStyles();

  return (
    <section className={classes.section}>
      <div className={classes.box}>
        <span className={classes.eyebrow}>Get Started</span>
        <h2 className={classes.headline}>Take command of your recurring spend today.</h2>
        <p className={classes.desc}>
          Private by architecture. No bank credentials needed. Start tracking in under thirty
          seconds.
        </p>

        <div className={classes.actions}>
          <button type="button" onClick={onOpenAuth} className={classes.primaryBtn}>
            Start tracking free
          </button>
          <button type="button" onClick={onLaunchApp} className={classes.secondaryBtn}>
            Explore live demo
          </button>
        </div>

        <span className={classes.note}>
          Free forever • 100% Client-side privacy • Official Google OAuth
        </span>
      </div>
    </section>
  );
}

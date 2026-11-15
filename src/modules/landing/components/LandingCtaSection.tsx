import { ArrowRight, Sparkles } from 'lucide-react';
import { GoogleIcon } from '@/modules/auth/components/GoogleIcon';
import { landingCtaStyles } from '@/modules/landing/recipes/landingCta.recipe';

interface LandingCtaSectionProps {
  onOpenAuth: () => void;
  onLaunchApp: () => void;
}

export function LandingCtaSection({ onOpenAuth, onLaunchApp }: LandingCtaSectionProps) {
  const classes = landingCtaStyles();

  return (
    <section className={classes.section}>
      <div className={classes.card}>
        <div className={classes.badge}>
          <Sparkles size={12} />
          <span>Ready to Stop the Bleeding?</span>
        </div>

        <h2 className={classes.title}>Take Command of Your Recurring Spend in 30 Seconds.</h2>

        <p className={classes.description}>
          Join thousands who track smarter, eliminate trial traps, and optimize their monthly
          run-rates.
        </p>

        <div className={classes.btnGroup}>
          <button type="button" onClick={onOpenAuth} className={classes.primaryBtn}>
            <GoogleIcon size={16} />
            <span>Get Started Free with Google</span>
          </button>

          <button type="button" onClick={onLaunchApp} className={classes.secondaryBtn}>
            <span>Explore Live Demo</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className={classes.footnote}>
          No credit card required • Instant setup • 100% Client-Side Privacy
        </div>
      </div>
    </section>
  );
}

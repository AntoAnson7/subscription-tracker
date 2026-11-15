import { ArrowRight, CheckCircle2, Lock, Shield, Sparkles } from 'lucide-react';
import { GoogleIcon } from '@/modules/auth/components/GoogleIcon';
import { landingHeroStyles } from '@/modules/landing/recipes/landingHero.recipe';

interface LandingHeroProps {
  onOpenAuth: () => void;
  onLaunchApp: () => void;
}

export function LandingHero({ onOpenAuth, onLaunchApp }: LandingHeroProps) {
  const classes = landingHeroStyles();

  return (
    <section className={classes.section}>
      <div className={classes.badgeWrapper}>
        <div className={`${classes.pillBadge} landing-glow-pulse`}>
          <Sparkles size={12} />
          <span>The Next-Gen Subscription Operating System</span>
        </div>
      </div>

      <h1 className={classes.title}>
        Stop Subscription Bleeding <span className={classes.gradientText}>Before It Starts.</span>
      </h1>

      <p className={classes.subtitle}>
        SubTrack syncs your digital subscriptions from Gmail receipts, detects stealth price hikes,
        alerts you before forgotten free trials convert, and uncovers hundreds in annual savings.
      </p>

      <div className={classes.ctaGroup}>
        <button type="button" onClick={onOpenAuth} className={classes.primaryBtn}>
          <GoogleIcon size={16} />
          <span>Start Tracking Free</span>
        </button>

        <button type="button" onClick={onLaunchApp} className={classes.secondaryBtn}>
          <span>Explore Live Demo</span>
          <ArrowRight size={14} />
        </button>
      </div>

      <div className={classes.trustStrip}>
        <div className={classes.trustItem}>
          <Lock size={13} />
          <span>100% Client-Side Privacy</span>
        </div>
        <div className={classes.trustItem}>
          <CheckCircle2 size={13} />
          <span>No Credit Card Required</span>
        </div>
        <div className={classes.trustItem}>
          <Shield size={13} />
          <span>Official Google Read-Only OAuth</span>
        </div>
      </div>
    </section>
  );
}

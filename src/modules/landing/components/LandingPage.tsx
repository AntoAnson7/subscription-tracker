import { Footer } from '@/modules/legal/components/Footer';
import { LegalTab } from '@/modules/legal/types/legal.types';
import { LandingCtaSection } from '@/modules/landing/components/LandingCtaSection';
import { LandingFaqSection } from '@/modules/landing/components/LandingFaqSection';
import { LandingFeatureShowcase } from '@/modules/landing/components/LandingFeatureShowcase';
import { LandingHeader } from '@/modules/landing/components/LandingHeader';
import { LandingHero } from '@/modules/landing/components/LandingHero';
import { LandingInteractivePreview } from '@/modules/landing/components/LandingInteractivePreview';
import { LandingMetricsBanner } from '@/modules/landing/components/LandingMetricsBanner';
import { landingPageStyles } from '@/modules/landing/recipes/landingPage.recipe';

interface LandingPageProps {
  onOpenAuth: () => void;
  onLaunchApp: () => void;
  onOpenLegal: (tab: LegalTab) => void;
}

export function LandingPage({ onOpenAuth, onLaunchApp, onOpenLegal }: LandingPageProps) {
  const classes = landingPageStyles();

  return (
    <div className={classes.root}>
      <LandingHeader onOpenAuth={onOpenAuth} onLaunchApp={onLaunchApp} />

      <main className={classes.content}>
        <div className={`${classes.ambientGlow} ambient-animated`} />
        <LandingHero onOpenAuth={onOpenAuth} onLaunchApp={onLaunchApp} />
        <LandingInteractivePreview />
        <LandingMetricsBanner />
        <LandingFeatureShowcase />
        <LandingFaqSection />
        <LandingCtaSection onOpenAuth={onOpenAuth} onLaunchApp={onLaunchApp} />
      </main>

      <Footer onOpenLegal={onOpenLegal} onOpenAuth={onOpenAuth} />
    </div>
  );
}

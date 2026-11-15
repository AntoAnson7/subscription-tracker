import { Footer } from '@/modules/legal/components/Footer';
import { LegalTab } from '@/modules/legal/types/legal.types';
import { AppleCta } from '@/modules/landing/components/AppleCta';
import { AppleDeviceShowcase } from '@/modules/landing/components/AppleDeviceShowcase';
import { AppleFaq } from '@/modules/landing/components/AppleFaq';
import { AppleHero } from '@/modules/landing/components/AppleHero';
import { AppleNav } from '@/modules/landing/components/AppleNav';
import { AppleSpecsTable } from '@/modules/landing/components/AppleSpecsTable';
import { AppleStorySections } from '@/modules/landing/components/AppleStorySections';
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
      <AppleNav onOpenAuth={onOpenAuth} onLaunchApp={onLaunchApp} />

      <main className={classes.content}>
        <AppleHero onOpenAuth={onOpenAuth} onLaunchApp={onLaunchApp} />
        <AppleDeviceShowcase />
        <AppleStorySections />
        <AppleSpecsTable />
        <AppleFaq />
        <AppleCta onOpenAuth={onOpenAuth} onLaunchApp={onLaunchApp} />
      </main>

      <Footer onOpenLegal={onOpenLegal} onOpenAuth={onOpenAuth} />
    </div>
  );
}

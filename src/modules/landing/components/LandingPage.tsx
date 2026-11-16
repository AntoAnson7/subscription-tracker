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
  isLoggedIn?: boolean;
  onOpenAuth: () => void;
  onLaunchApp: () => void;
  onExploreDemo?: () => void;
  onOpenLegal: (tab: LegalTab) => void;
}

export function LandingPage({
  isLoggedIn,
  onOpenAuth,
  onLaunchApp,
  onExploreDemo,
  onOpenLegal,
}: LandingPageProps) {
  const classes = landingPageStyles();
  const handleExplore = onExploreDemo ?? onLaunchApp;

  return (
    <div className={classes.root}>
      <AppleNav isLoggedIn={isLoggedIn} onLaunchApp={onLaunchApp} />

      <main className={classes.content}>
        <AppleHero onOpenAuth={onOpenAuth} onLaunchApp={handleExplore} />
        <AppleDeviceShowcase />
        <AppleStorySections />
        <AppleSpecsTable />
        <AppleFaq />
        <AppleCta onOpenAuth={onOpenAuth} onLaunchApp={handleExplore} />
      </main>

      <Footer onOpenLegal={onOpenLegal} onOpenAuth={onOpenAuth} />
    </div>
  );
}

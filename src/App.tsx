import { useCallback, useEffect, useRef, useState } from 'react';
import { useAuth } from '@/modules/auth/hooks/useAuth';
import { useProfile } from '@/modules/auth/hooks/useProfile';
import { AppBackground } from '@/modules/common/components/AppBackground';
import { AppModals } from '@/modules/common/components/AppModals';
import { Header } from '@/modules/common/components/Header';
import { CurrencyProvider } from '@/modules/common/context/CurrencyProvider';
import { useAppView } from '@/modules/common/hooks/useAppView';
import { useTabParam } from '@/modules/common/hooks/useTabParam';
import { CurrencyCode } from '@/modules/common/types/currency.types';
import { DashboardView } from '@/modules/dashboard/components/DashboardView';
import { useExport } from '@/modules/export/hooks/useExport';
import { LandingPage } from '@/modules/landing/components/LandingPage';
import { Footer } from '@/modules/legal/components/Footer';
import { useLegalModal } from '@/modules/legal/hooks/useLegalModal';
import { useAppSubscriptions } from '@/modules/subscriptions/hooks/useAppSubscriptions';
import { useSyncManager } from '@/modules/sync/hooks/useSyncManager';

export function App() {
  const [mockLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [activeTab, setActiveTab] = useTabParam();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const redirectToAppAfterAuthRef = useRef(false);

  const { user, loading: authLoading, signInWithGoogle, signOut, error: authError } = useAuth();
  const { currentView, navigateToView } = useAppView(!!user);
  const { profile, needsOnboarding, createProfile } = useProfile(user);
  const subManager = useAppSubscriptions(user?.id ?? null);
  const legalModal = useLegalModal();
  const exportManager = useExport();

  const handleLaunchApp = useCallback(() => {
    if (user) {
      navigateToView('app');
    } else {
      redirectToAppAfterAuthRef.current = true;
      setIsAuthModalOpen(true);
    }
  }, [user, navigateToView]);

  const prevUserRef = useRef(user);
  useEffect(() => {
    if (!prevUserRef.current && user) {
      if (redirectToAppAfterAuthRef.current) {
        redirectToAppAfterAuthRef.current = false;
        navigateToView('app');
      }
    }
    prevUserRef.current = user;
  }, [user, navigateToView]);

  const syncManager = useSyncManager({
    userId: user?.id ?? null,
    subscriptions: subManager.subscriptions,
    onAddSubscription: subManager.handleModalSubmit,
    onCancelSubscription: subManager.cancelSubscription,
    onUpdateSubscriptionCost: subManager.updateSubscriptionCost,
  });

  return (
    <CurrencyProvider
      key={profile?.preferredCurrency || 'default'}
      initialCurrency={profile?.preferredCurrency as CurrencyCode | undefined}
    >
      <AppBackground>
        {currentView === 'landing' ? (
          <LandingPage
            isLoggedIn={!!user}
            onOpenAuth={() => setIsAuthModalOpen(true)}
            onLaunchApp={handleLaunchApp}
            onExploreDemo={() => navigateToView('app')}
            onOpenLegal={legalModal.openLegal}
          />
        ) : (
          <>
            <Header
              user={user}
              profile={profile}
              isLoading={mockLoading || authLoading}
              onOpenAuth={() => setIsAuthModalOpen(true)}
              onOpenProfile={() => setIsProfileModalOpen(true)}
              onBackToLanding={() => navigateToView('landing')}
            />
            <DashboardView
              subManager={subManager}
              syncManager={syncManager}
              exportManager={exportManager}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              mockLoading={mockLoading}
            />
            <Footer
              onOpenLegal={legalModal.openLegal}
              onOpenAuth={!user ? () => setIsAuthModalOpen(true) : undefined}
            />
          </>
        )}

        <AppModals
          isSubModalOpen={subManager.isModalOpen}
          onCloseSubModal={subManager.handleCloseModal}
          onSubmitSubModal={subManager.handleModalSubmit}
          onDeleteSub={subManager.deleteSubscription}
          activeSub={subManager.activeSub}
          isAuthOpen={isAuthModalOpen && !user}
          onCloseAuth={() => {
            setIsAuthModalOpen(false);
            redirectToAppAfterAuthRef.current = false;
          }}
          onGoogleSignIn={signInWithGoogle}
          authError={authError}
          needsOnboarding={needsOnboarding}
          user={user}
          onCreateProfile={createProfile}
          isProfileOpen={isProfileModalOpen}
          onCloseProfile={() => setIsProfileModalOpen(false)}
          profile={profile}
          onSignOut={signOut}
          syncManager={syncManager}
          isLegalOpen={legalModal.isLegalOpen}
          activeLegalTab={legalModal.activeLegalTab}
          onCloseLegal={legalModal.closeLegal}
          onLegalTabChange={legalModal.setActiveLegalTab}
          exportManager={exportManager}
          subscriptions={subManager.subscriptions}
          currency={profile?.preferredCurrency || 'INR'}
        />
      </AppBackground>
    </CurrencyProvider>
  );
}

export default App;

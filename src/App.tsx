import { useState } from 'react';
import { AuthModals } from '@/modules/auth/components/AuthModals';
import { useAuth } from '@/modules/auth/hooks/useAuth';
import { useProfile } from '@/modules/auth/hooks/useProfile';
import { AppBackground } from '@/modules/common/components/AppBackground';
import { CurrencyProvider } from '@/modules/common/context/CurrencyProvider';
import { Header } from '@/modules/common/components/Header';
import { ViewControls } from '@/modules/common/components/ViewControls';
import { layoutStyles } from '@/modules/common/recipes/layout.recipe';
import { CurrencyCode } from '@/modules/common/types/currency.types';
import { RunRateHero } from '@/modules/dashboard/components/RunRateHero';
import { RunRateHeroSkeleton } from '@/modules/dashboard/components/RunRateHeroSkeleton';
import { TrialAlertBanner } from '@/modules/dashboard/components/TrialAlertBanner';
import { SubscriptionContentView } from '@/modules/subscriptions/components/SubscriptionContentView';
import { SubscriptionFilterBar } from '@/modules/subscriptions/components/SubscriptionFilterBar';
import { SubscriptionModal } from '@/modules/subscriptions/components/SubscriptionModal';
import { useAppSubscriptions } from '@/modules/subscriptions/hooks/useAppSubscriptions';

export function App() {
  const [mockLoading, setMockLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [activeTab, setActiveTab] = useState<'subscriptions' | 'calendar' | 'analytics'>(
    'subscriptions'
  );
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const { user, loading: authLoading, signInWithGoogle, signOut, error: authError } = useAuth();
  const { profile, needsOnboarding, createProfile } = useProfile(user);
  const subManager = useAppSubscriptions(user?.id ?? null);
  const classes = layoutStyles();
  const isSkeletonActive = mockLoading || subManager.subsLoading;

  return (
    <CurrencyProvider
      key={profile?.preferredCurrency || 'default'}
      initialCurrency={profile?.preferredCurrency as CurrencyCode | undefined}
    >
      <AppBackground>
        <Header
          user={user}
          profile={profile}
          isLoading={mockLoading || authLoading}
          onOpenAuth={() => setIsAuthModalOpen(true)}
          onOpenProfile={() => setIsProfileModalOpen(true)}
        />
        <main className={classes.mainContainer}>
          <TrialAlertBanner trialSubscription={subManager.expiringTrial} />

          {isSkeletonActive ? (
            <RunRateHeroSkeleton />
          ) : (
            <RunRateHero metrics={subManager.metrics} onAddClick={subManager.handleOpenAdd} />
          )}

          <ViewControls
            activeTab={activeTab}
            onTabChange={setActiveTab}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            subscriptionsCount={subManager.subscriptionsCount}
          />

          <SubscriptionFilterBar
            searchQuery={subManager.filter.searchQuery}
            onSearchChange={subManager.filter.setSearchQuery}
            selectedCategory={subManager.filter.selectedCategory}
            onCategoryChange={subManager.filter.setSelectedCategory}
            categories={subManager.filter.categories}
          />

          <div
            key={`${activeTab}-${viewMode}`}
            className={`${classes.contentSection} tab-content-animated`}
          >
            <SubscriptionContentView
              viewMode={viewMode}
              isLoading={subManager.subsLoading}
              showAllSkeletons={mockLoading}
              subscriptions={subManager.filter.filteredSubscriptions}
              onEdit={subManager.handleOpenEdit}
            />
          </div>
        </main>

        <SubscriptionModal
          isOpen={subManager.isModalOpen}
          onClose={subManager.handleCloseModal}
          onSubmit={subManager.handleModalSubmit}
          onDelete={subManager.deleteSubscription}
          initialSubscription={subManager.activeSub}
        />

        <AuthModals
          isAuthOpen={isAuthModalOpen}
          onCloseAuth={() => setIsAuthModalOpen(false)}
          onGoogleSignIn={signInWithGoogle}
          authError={authError}
          needsOnboarding={needsOnboarding}
          user={user}
          onCreateProfile={createProfile}
          isProfileOpen={isProfileModalOpen}
          onCloseProfile={() => setIsProfileModalOpen(false)}
          profile={profile}
          onSignOut={signOut}
        />

        {import.meta.env.DEV && (
          <button
            type="button"
            onClick={() => setMockLoading((p) => !p)}
            style={{
              position: 'fixed',
              bottom: '16px',
              left: '16px',
              zIndex: 90,
              background: mockLoading ? '#D97706' : 'rgba(0,0,0,0.6)',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '9999px',
              padding: '6px 14px',
              fontSize: '11px',
              fontWeight: 700,
              cursor: 'pointer',
              backdropFilter: 'blur(10px)',
            }}
          >
            {mockLoading ? 'Skeletons Preview: ON' : 'Skeletons Preview: OFF'}
          </button>
        )}
      </AppBackground>
    </CurrencyProvider>
  );
}

export default App;

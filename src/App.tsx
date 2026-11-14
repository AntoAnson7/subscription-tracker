import { useState } from 'react';
import { AuthModal } from '@/modules/auth/components/AuthModal';
import { OnboardingModal } from '@/modules/auth/components/OnboardingModal';
import { ProfileModal } from '@/modules/auth/components/ProfileModal';
import { useAuth } from '@/modules/auth/hooks/useAuth';
import { useProfile } from '@/modules/auth/hooks/useProfile';
import { AppBackground } from '@/modules/common/components/AppBackground';
import { CurrencyProvider } from '@/modules/common/context/CurrencyProvider';
import { Header } from '@/modules/common/components/Header';
import { ViewControls } from '@/modules/common/components/ViewControls';
import { layoutStyles } from '@/modules/common/recipes/layout.recipe';
import { CurrencyCode } from '@/modules/common/types/currency.types';
import { RunRateHero } from '@/modules/dashboard/components/RunRateHero';
import { TrialAlertBanner } from '@/modules/dashboard/components/TrialAlertBanner';
import { useRunRateMetrics } from '@/modules/dashboard/hooks/useRunRateMetrics';
import { SubscriptionFilterBar } from '@/modules/subscriptions/components/SubscriptionFilterBar';
import { SubscriptionGrid } from '@/modules/subscriptions/components/SubscriptionGrid';
import { SubscriptionModal } from '@/modules/subscriptions/components/SubscriptionModal';
import { SubscriptionTable } from '@/modules/subscriptions/components/SubscriptionTable';
import { useSubscriptionFilter } from '@/modules/subscriptions/hooks/useSubscriptionFilter';
import { useSubscriptions } from '@/modules/subscriptions/hooks/useSubscriptions';

export function App() {
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [activeTab, setActiveTab] = useState<'subscriptions' | 'calendar' | 'analytics'>(
    'subscriptions'
  );
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const { user, signInWithGoogle, signOut, error: authError } = useAuth();
  const { profile, needsOnboarding, createProfile } = useProfile(user);
  const { subscriptions, addSubscription } = useSubscriptions(user?.id ?? null);
  const metrics = useRunRateMetrics(subscriptions);
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    categories,
    filteredSubscriptions,
  } = useSubscriptionFilter(subscriptions);

  const classes = layoutStyles();

  const expiringTrial =
    subscriptions.find((sub) => sub.status === 'trial' && sub.daysRemaining <= 7) ?? null;

  return (
    <CurrencyProvider
      key={profile?.preferredCurrency || 'default'}
      initialCurrency={profile?.preferredCurrency as CurrencyCode | undefined}
    >
      <AppBackground>
        <Header
          user={user}
          profile={profile}
          onOpenAuth={() => setIsAuthModalOpen(true)}
          onOpenProfile={() => setIsProfileModalOpen(true)}
        />
        <main className={classes.mainContainer}>
          <TrialAlertBanner trialSubscription={expiringTrial} />

          <RunRateHero metrics={metrics} onAddClick={() => setIsAddModalOpen(true)} />

          <ViewControls
            activeTab={activeTab}
            onTabChange={setActiveTab}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            subscriptionsCount={subscriptions.length}
          />

          <SubscriptionFilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            categories={categories}
          />

          <div
            key={`${activeTab}-${viewMode}`}
            className={`${classes.contentSection} tab-content-animated`}
          >
            {viewMode === 'grid' ? (
              <SubscriptionGrid subscriptions={filteredSubscriptions} />
            ) : (
              <SubscriptionTable subscriptions={filteredSubscriptions} />
            )}
          </div>
        </main>

        <SubscriptionModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAdd={addSubscription}
        />

        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onGoogleSignIn={async () => {
            await signInWithGoogle();
            setIsAuthModalOpen(false);
          }}
          error={authError}
        />

        <OnboardingModal isOpen={needsOnboarding} user={user} onSubmit={createProfile} />

        <ProfileModal
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
          user={user}
          profile={profile}
          onSignOut={signOut}
        />
      </AppBackground>
    </CurrencyProvider>
  );
}

export default App;

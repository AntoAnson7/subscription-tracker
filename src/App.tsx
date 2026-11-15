import { useState } from 'react';
import { AnalyticsDashboard } from '@/modules/analytics/components/AnalyticsDashboard';
import { useAuth } from '@/modules/auth/hooks/useAuth';
import { useProfile } from '@/modules/auth/hooks/useProfile';
import { MonthlyCalendar } from '@/modules/calendar/components/MonthlyCalendar';
import { AppBackground } from '@/modules/common/components/AppBackground';
import { AppModals } from '@/modules/common/components/AppModals';
import { Header } from '@/modules/common/components/Header';
import { ViewControls } from '@/modules/common/components/ViewControls';
import { CurrencyProvider } from '@/modules/common/context/CurrencyProvider';
import { useTabParam } from '@/modules/common/hooks/useTabParam';
import { layoutStyles } from '@/modules/common/recipes/layout.recipe';
import { CurrencyCode } from '@/modules/common/types/currency.types';
import { RunRateHero } from '@/modules/dashboard/components/RunRateHero';
import { RunRateHeroSkeleton } from '@/modules/dashboard/components/RunRateHeroSkeleton';
import { TrialAlertBanner } from '@/modules/dashboard/components/TrialAlertBanner';
import { SubscriptionContentView } from '@/modules/subscriptions/components/SubscriptionContentView';
import { SubscriptionFilterBar } from '@/modules/subscriptions/components/SubscriptionFilterBar';
import { useAppSubscriptions } from '@/modules/subscriptions/hooks/useAppSubscriptions';
import { CancellationAlertBanner } from '@/modules/sync/components/CancellationAlertBanner';
import { useSyncManager } from '@/modules/sync/hooks/useSyncManager';

export function App() {
  const [mockLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [activeTab, setActiveTab] = useTabParam();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const { user, loading: authLoading, signInWithGoogle, signOut, error: authError } = useAuth();
  const { profile, needsOnboarding, createProfile } = useProfile(user);
  const subManager = useAppSubscriptions(user?.id ?? null);

  const syncManager = useSyncManager({
    userId: user?.id ?? null,
    subscriptions: subManager.subscriptions,
    onAddSubscription: subManager.handleModalSubmit,
    onCancelSubscription: subManager.cancelSubscription,
  });

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
          <CancellationAlertBanner
            alerts={syncManager.cancellationAlerts}
            onConfirm={syncManager.confirmCancellation}
            onDismiss={syncManager.dismissCancellation}
          />
          <TrialAlertBanner trialSubscription={subManager.expiringTrial} />

          {isSkeletonActive ? (
            <RunRateHeroSkeleton isCompact={activeTab !== 'subscriptions'} />
          ) : (
            <RunRateHero
              metrics={subManager.metrics}
              onAddClick={subManager.handleOpenAdd}
              isCompact={activeTab !== 'subscriptions'}
            />
          )}

          <ViewControls
            activeTab={activeTab}
            onTabChange={setActiveTab}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            subscriptionsCount={subManager.subscriptionsCount}
          />

          {activeTab === 'subscriptions' && (
            <SubscriptionFilterBar
              searchQuery={subManager.filter.searchQuery}
              onSearchChange={subManager.filter.setSearchQuery}
              selectedCategory={subManager.filter.selectedCategory}
              onCategoryChange={subManager.filter.setSelectedCategory}
              categories={subManager.filter.categories}
            />
          )}

          <div
            key={`${activeTab}-${viewMode}`}
            className={`${classes.contentSection} tab-content-animated`}
          >
            {activeTab === 'subscriptions' && (
              <SubscriptionContentView
                viewMode={viewMode}
                isLoading={subManager.subsLoading}
                showAllSkeletons={mockLoading}
                subscriptions={subManager.filter.filteredSubscriptions}
                onEdit={subManager.handleOpenEdit}
                onCancel={subManager.cancelSubscription}
                onRenew={subManager.handleOpenRenew}
              />
            )}
            {activeTab === 'calendar' && (
              <MonthlyCalendar
                subscriptions={subManager.subscriptions}
                onEdit={subManager.handleOpenEdit}
              />
            )}
            {activeTab === 'analytics' && (
              <AnalyticsDashboard subscriptions={subManager.subscriptions} />
            )}
          </div>
        </main>

        <AppModals
          isSubModalOpen={subManager.isModalOpen}
          onCloseSubModal={subManager.handleCloseModal}
          onSubmitSubModal={subManager.handleModalSubmit}
          onDeleteSub={subManager.deleteSubscription}
          activeSub={subManager.activeSub}
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
          syncManager={syncManager}
        />
      </AppBackground>
    </CurrencyProvider>
  );
}

export default App;

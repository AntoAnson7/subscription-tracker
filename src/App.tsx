import { useState } from 'react';
import { AppBackground } from '@/modules/common/components/AppBackground';
import { Header } from '@/modules/common/components/Header';
import { ViewControls } from '@/modules/common/components/ViewControls';
import { layoutStyles } from '@/modules/common/recipes/layout.recipe';
import { RunRateHero } from '@/modules/dashboard/components/RunRateHero';
import { TrialAlertBanner } from '@/modules/dashboard/components/TrialAlertBanner';
import { useRunRateMetrics } from '@/modules/dashboard/hooks/useRunRateMetrics';
import { SubscriptionFilterBar } from '@/modules/subscriptions/components/SubscriptionFilterBar';
import { SubscriptionGrid } from '@/modules/subscriptions/components/SubscriptionGrid';
import { SubscriptionTable } from '@/modules/subscriptions/components/SubscriptionTable';
import { useSubscriptionFilter } from '@/modules/subscriptions/hooks/useSubscriptionFilter';
import { useSubscriptions } from '@/modules/subscriptions/hooks/useSubscriptions';

export function App() {
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [activeTab, setActiveTab] = useState<'subscriptions' | 'calendar' | 'analytics'>(
    'subscriptions'
  );

  const { subscriptions, loadSampleData } = useSubscriptions();
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
    <AppBackground>
      <Header />
      <main className={classes.mainContainer}>
        <TrialAlertBanner trialSubscription={expiringTrial} />

        <RunRateHero
          metrics={metrics}
          onAddClick={() => alert('Add Subscription Modal coming next!')}
          onLoadSampleData={loadSampleData}
        />

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

        <div className={classes.contentSection}>
          {viewMode === 'grid' ? (
            <SubscriptionGrid subscriptions={filteredSubscriptions} />
          ) : (
            <SubscriptionTable subscriptions={filteredSubscriptions} />
          )}
        </div>
      </main>
    </AppBackground>
  );
}

export default App;

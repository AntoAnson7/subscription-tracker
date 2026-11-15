import { MainTabContent } from '@/modules/common/components/MainTabContent';
import { ViewControls } from '@/modules/common/components/ViewControls';
import { AppTab } from '@/modules/common/hooks/useTabParam';
import { layoutStyles } from '@/modules/common/recipes/layout.recipe';
import { RunRateHero } from '@/modules/dashboard/components/RunRateHero';
import { RunRateHeroSkeleton } from '@/modules/dashboard/components/RunRateHeroSkeleton';
import { TrialAlertBanner } from '@/modules/dashboard/components/TrialAlertBanner';
import { useExport } from '@/modules/export/hooks/useExport';
import { SubscriptionFilterBar } from '@/modules/subscriptions/components/SubscriptionFilterBar';
import { useAppSubscriptions } from '@/modules/subscriptions/hooks/useAppSubscriptions';
import { CancellationAlertBanner } from '@/modules/sync/components/CancellationAlertBanner';
import { PriceHikeAlertBanner } from '@/modules/sync/components/PriceHikeAlertBanner';
import { useSyncManager } from '@/modules/sync/hooks/useSyncManager';

interface DashboardViewProps {
  subManager: ReturnType<typeof useAppSubscriptions>;
  syncManager: ReturnType<typeof useSyncManager>;
  exportManager: ReturnType<typeof useExport>;
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
  viewMode: 'grid' | 'table';
  onViewModeChange: (mode: 'grid' | 'table') => void;
  mockLoading: boolean;
}

export function DashboardView({
  subManager,
  syncManager,
  exportManager,
  activeTab,
  onTabChange,
  viewMode,
  onViewModeChange,
  mockLoading,
}: DashboardViewProps) {
  const classes = layoutStyles();
  const isSkeletonActive = mockLoading || subManager.subsLoading;

  return (
    <main className={classes.mainContainer}>
      <PriceHikeAlertBanner
        alerts={syncManager.priceHikeAlerts}
        onApply={syncManager.applyPriceHike}
        onDismiss={syncManager.dismissPriceHike}
      />
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
        onTabChange={onTabChange}
        viewMode={viewMode}
        onViewModeChange={onViewModeChange}
        subscriptionsCount={subManager.subscriptionsCount}
        onOpenExport={exportManager.openExport}
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

      <MainTabContent
        activeTab={activeTab}
        viewMode={viewMode}
        subManager={subManager}
        mockLoading={mockLoading}
        className={classes.contentSection}
      />
    </main>
  );
}

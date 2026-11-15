import { AnalyticsDashboard } from '@/modules/analytics/components/AnalyticsDashboard';
import { MonthlyCalendar } from '@/modules/calendar/components/MonthlyCalendar';
import { AppTab } from '@/modules/common/hooks/useTabParam';
import { SubscriptionContentView } from '@/modules/subscriptions/components/SubscriptionContentView';
import { useAppSubscriptions } from '@/modules/subscriptions/hooks/useAppSubscriptions';

interface MainTabContentProps {
  activeTab: AppTab;
  viewMode: 'grid' | 'table';
  subManager: ReturnType<typeof useAppSubscriptions>;
  mockLoading: boolean;
  className: string;
}

export function MainTabContent({
  activeTab,
  viewMode,
  subManager,
  mockLoading,
  className,
}: MainTabContentProps) {
  return (
    <div key={`${activeTab}-${viewMode}`} className={`${className} tab-content-animated`}>
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
      {activeTab === 'analytics' && <AnalyticsDashboard subscriptions={subManager.subscriptions} />}
    </div>
  );
}

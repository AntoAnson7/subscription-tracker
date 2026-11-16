import { AnalyticsDashboard } from '@/modules/analytics/components/AnalyticsDashboard';
import { MonthlyCalendar } from '@/modules/calendar/components/MonthlyCalendar';
import { RunRateHero } from '@/modules/dashboard/components/RunRateHero';
import { useAppleShowcase } from '@/modules/landing/hooks/useAppleShowcase';
import { appleDeviceStyles } from '@/modules/landing/recipes/appleDevice.recipe';
import {
  SHOWCASE_METRICS,
  SHOWCASE_SUBSCRIPTIONS,
} from '@/modules/landing/utils/appleShowcase.data';
import { SubscriptionGrid } from '@/modules/subscriptions/components/SubscriptionGrid';

export function AppleDeviceShowcase() {
  const classes = appleDeviceStyles();
  const { activeTab, selectTab } = useAppleShowcase();

  return (
    <section className={classes.root} aria-label="Interactive macOS device showcase">
      <div className={classes.container}>
        <div className={classes.deviceFrame}>
          <div className={classes.deviceHeader}>
            <div className={classes.trafficLights} aria-hidden="true">
              <div className={classes.trafficLight} style={{ backgroundColor: '#FF5F56' }} />
              <div className={classes.trafficLight} style={{ backgroundColor: '#FFBD2E' }} />
              <div className={classes.trafficLight} style={{ backgroundColor: '#27C93F' }} />
            </div>

            <span className={classes.windowTitle}>
              <img
                src="/subwise-icon.png"
                alt=""
                style={{ width: '14px', height: '14px', objectFit: 'contain' }}
              />
              <span>Subwise — Personal Workspace</span>
            </span>

            <div className={classes.segmentBar} role="tablist" aria-label="Showcase screens">
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'subscriptions'}
                onClick={() => selectTab('subscriptions')}
                className={`${classes.segmentBtn} ${activeTab === 'subscriptions' ? classes.segmentBtnActive : ''}`}
              >
                Subscriptions ({SHOWCASE_SUBSCRIPTIONS.length})
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'calendar'}
                onClick={() => selectTab('calendar')}
                className={`${classes.segmentBtn} ${activeTab === 'calendar' ? classes.segmentBtnActive : ''}`}
              >
                Calendar
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'analytics'}
                onClick={() => selectTab('analytics')}
                className={`${classes.segmentBtn} ${activeTab === 'analytics' ? classes.segmentBtnActive : ''}`}
              >
                Analytics
              </button>
            </div>
          </div>

          <div className={classes.screenBody}>
            {activeTab === 'subscriptions' && (
              <div className={classes.screenView}>
                <RunRateHero metrics={SHOWCASE_METRICS} onAddClick={() => {}} isCompact={false} />
                <SubscriptionGrid subscriptions={SHOWCASE_SUBSCRIPTIONS} />
              </div>
            )}

            {activeTab === 'calendar' && (
              <div className={classes.screenView}>
                <MonthlyCalendar subscriptions={SHOWCASE_SUBSCRIPTIONS} />
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className={classes.screenView}>
                <AnalyticsDashboard subscriptions={SHOWCASE_SUBSCRIPTIONS} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

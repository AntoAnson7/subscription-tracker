import { useAppleShowcase } from '@/modules/landing/hooks/useAppleShowcase';
import { appleDeviceStyles } from '@/modules/landing/recipes/appleDevice.recipe';
import { appleDeviceRowStyles } from '@/modules/landing/recipes/appleDeviceRow.recipe';

export function AppleDeviceShowcase() {
  const classes = appleDeviceStyles();
  const rowClasses = appleDeviceRowStyles();
  const { activeTab, selectTab, hikeUpdated, handleApplyHike } = useAppleShowcase();

  return (
    <section className={classes.root}>
      <div className={classes.container}>
        <div className={classes.deviceFrame}>
          <div className={classes.deviceHeader}>
            <div className={classes.trafficLights}>
              <div className={classes.trafficLight} style={{ backgroundColor: '#FF5F56' }} />
              <div className={classes.trafficLight} style={{ backgroundColor: '#FFBD2E' }} />
              <div className={classes.trafficLight} style={{ backgroundColor: '#27C93F' }} />
            </div>

            <div className={classes.segmentBar}>
              <button
                type="button"
                onClick={() => selectTab('overview')}
                className={`${classes.segmentBtn} ${activeTab === 'overview' ? classes.segmentBtnActive : ''}`}
              >
                Overview
              </button>
              <button
                type="button"
                onClick={() => selectTab('hikes')}
                className={`${classes.segmentBtn} ${activeTab === 'hikes' ? classes.segmentBtnActive : ''}`}
              >
                Price Hikes (1)
              </button>
              <button
                type="button"
                onClick={() => selectTab('savings')}
                className={`${classes.segmentBtn} ${activeTab === 'savings' ? classes.segmentBtnActive : ''}`}
              >
                Savings Optimizer
              </button>
            </div>
          </div>

          <div className={classes.screenBody}>
            {activeTab === 'overview' && (
              <>
                <div className={classes.overviewGrid}>
                  <div className={classes.metricTile}>
                    <span className={classes.metricLabel}>Monthly Run-Rate</span>
                    <span className={classes.metricValue}>$142.40</span>
                    <span className={classes.metricFoot}>$1,708.80 per year</span>
                  </div>
                  <div className={classes.metricTile}>
                    <span className={classes.metricLabel}>Active Subscriptions</span>
                    <span className={classes.metricValue}>8</span>
                    <span className={classes.metricFoot}>3 categories</span>
                  </div>
                  <div className={classes.metricTile}>
                    <span className={classes.metricLabel}>Next Renewal</span>
                    <span className={classes.metricValue}>3 days</span>
                    <span className={classes.metricFoot}>Netflix Premium</span>
                  </div>
                </div>

                <div className={rowClasses.subRow}>
                  <div className={rowClasses.subLeft}>
                    <span className={rowClasses.subName}>Netflix Premium</span>
                    <span className={rowClasses.subMeta}>Entertainment • Monthly</span>
                  </div>
                  <div className={rowClasses.subRight}>
                    <span className={rowClasses.subCost}>$22.99/mo</span>
                    <span
                      className={rowClasses.subPill}
                      style={{ backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#D97706' }}
                    >
                      Hike Detected
                    </span>
                  </div>
                </div>

                <div className={rowClasses.subRow}>
                  <div className={rowClasses.subLeft}>
                    <span className={rowClasses.subName}>Spotify Family</span>
                    <span className={rowClasses.subMeta}>Shared with 4 members • Your share</span>
                  </div>
                  <div className={rowClasses.subRight}>
                    <span className={rowClasses.subCost}>$4.25/mo</span>
                    <span
                      className={rowClasses.subPill}
                      style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10B981' }}
                    >
                      Active
                    </span>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'hikes' && (
              <div className={classes.metricTile}>
                <span className={classes.metricLabel}>Stealth Hike Alert</span>
                <span className={classes.metricValue}>Netflix Premium (+15%)</span>
                <p style={{ fontSize: '13px', color: '#71717A', margin: '4px 0 12px' }}>
                  Charge increased from $19.99 to $22.99. Annual impact: +$36.00/yr.
                </p>
                <div>
                  <button
                    type="button"
                    onClick={handleApplyHike}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '9999px',
                      fontSize: '12px',
                      fontWeight: '600',
                      backgroundColor: hikeUpdated ? '#10B981' : '#D97706',
                      color: 'white',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    {hikeUpdated ? 'Updated to $22.99' : '1-Tap Update to $22.99'}
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'savings' && (
              <div className={classes.metricTile}>
                <span className={classes.metricLabel}>Annual Switch Opportunity</span>
                <span className={classes.metricValue}>$284.00/yr Savings</span>
                <p style={{ fontSize: '13px', color: '#71717A', margin: '4px 0' }}>
                  Switching 3 monthly subscriptions (Figma, Claude, 1Password) to annual plans
                  unlocks 2 months free equivalent.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

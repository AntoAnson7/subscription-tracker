import { Sparkles, TrendingUp, X } from 'lucide-react';
import { useLandingPreview } from '@/modules/landing/hooks/useLandingPreview';
import { landingPreviewStyles } from '@/modules/landing/recipes/landingPreview.recipe';
import { landingPreviewCardStyles } from '@/modules/landing/recipes/landingPreviewCard.recipe';

export function LandingInteractivePreview() {
  const classes = landingPreviewStyles();
  const cardClasses = landingPreviewCardStyles();
  const {
    isAnnual,
    toggleAnnual,
    isHikeDismissed,
    dismissHike,
    displayedCost,
    annualSavings,
    subscriptions,
  } = useLandingPreview();

  return (
    <section id="interactive-demo" className={classes.root}>
      <div className={classes.container}>
        <div className={classes.cardWrapper}>
          <div className={classes.cardHeader}>
            <div className={classes.headerLeft}>
              <span className={classes.metricLabel}>
                {isAnnual ? 'Optimized Annual Run-Rate' : 'Current Monthly Run-Rate'}
              </span>
              <div className={classes.metricValue}>
                ${displayedCost.toFixed(2)}
                <span style={{ fontSize: '14px', fontWeight: '500', color: '#71717A' }}> / mo</span>
              </div>
              {isAnnual && (
                <div className={classes.metricSavings}>
                  <Sparkles size={13} />
                  <span>Unlocking ${annualSavings}/yr in annual billing discounts</span>
                </div>
              )}
            </div>

            <div className={classes.headerRight}>
              <div className={classes.togglePill}>
                <button
                  type="button"
                  onClick={toggleAnnual}
                  className={`${classes.toggleOption} ${!isAnnual ? classes.toggleOptionActive : ''}`}
                >
                  Standard Monthly
                </button>
                <button
                  type="button"
                  onClick={toggleAnnual}
                  className={`${classes.toggleOption} ${isAnnual ? classes.toggleOptionActive : ''}`}
                >
                  ✨ Annual Optimized
                </button>
              </div>
            </div>
          </div>

          {!isHikeDismissed && (
            <div className={classes.alertStrip}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <TrendingUp size={14} color="#D97706" />
                <span className={classes.alertText}>
                  Price Hike Detected: <strong>Netflix Premium</strong> increased from $19.99 to
                  $22.99 (+15%). Impact: +$36.00/yr.
                </span>
              </div>
              <button
                type="button"
                onClick={dismissHike}
                className={classes.alertBtn}
                title="Dismiss simulated alert"
              >
                <X size={12} />
              </button>
            </div>
          )}

          <div className={classes.cardsGrid}>
            {subscriptions.map((sub) => {
              const currentCost = isAnnual ? sub.annualOptimizedCost : sub.monthlyCost;
              return (
                <div key={sub.id} className={cardClasses.subCard}>
                  <div className={cardClasses.subCardTop}>
                    <span className={cardClasses.subCardName}>{sub.name}</span>
                    <span className={cardClasses.subCardCost}>${currentCost.toFixed(2)}/mo</span>
                  </div>
                  <div className={cardClasses.subCardBottom}>
                    <span className={cardClasses.subDetail}>{sub.subdetail}</span>
                    <span
                      className={cardClasses.badge}
                      style={{
                        backgroundColor:
                          sub.badgeType === 'price-hike'
                            ? 'rgba(245, 158, 11, 0.15)'
                            : sub.badgeType === 'trial'
                              ? 'rgba(239, 68, 68, 0.15)'
                              : 'rgba(16, 185, 129, 0.15)',
                        color:
                          sub.badgeType === 'price-hike'
                            ? '#D97706'
                            : sub.badgeType === 'trial'
                              ? '#EF4444'
                              : '#10B981',
                      }}
                    >
                      {sub.badgeText}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

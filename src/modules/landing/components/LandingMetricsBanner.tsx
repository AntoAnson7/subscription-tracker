import { Lock, Shield, Wallet, Zap } from 'lucide-react';
import { landingMetricsStyles } from '@/modules/landing/recipes/landingMetrics.recipe';
import { MetricIconName } from '@/modules/landing/types/landing.types';
import { LANDING_METRICS } from '@/modules/landing/utils/landingMetrics.data';

function renderMetricIcon(name: MetricIconName) {
  switch (name) {
    case 'wallet':
      return <Wallet size={18} />;
    case 'shield':
      return <Shield size={18} />;
    case 'lock':
      return <Lock size={18} />;
    case 'zap':
      return <Zap size={18} />;
  }
}

export function LandingMetricsBanner() {
  const classes = landingMetricsStyles();

  return (
    <section className={classes.section}>
      <div className={classes.container}>
        <div className={classes.grid}>
          {LANDING_METRICS.map((metric) => (
            <div key={metric.id} className={classes.item}>
              <div className={classes.iconWrapper}>{renderMetricIcon(metric.iconName)}</div>
              <div className={classes.value}>{metric.value}</div>
              <div className={classes.label}>{metric.label}</div>
              <div className={classes.subtext}>{metric.subtext}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

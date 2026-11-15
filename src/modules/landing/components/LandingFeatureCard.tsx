import { FileSpreadsheet, Mail, ShieldAlert, Sparkles, TrendingUp, Users } from 'lucide-react';
import { FeatureIconName, LandingFeature } from '@/modules/landing/types/landing.types';
import { landingFeaturesStyles } from '@/modules/landing/recipes/landingFeatures.recipe';

interface LandingFeatureCardProps {
  feature: LandingFeature;
}

function renderFeatureIcon(name: FeatureIconName) {
  switch (name) {
    case 'mail':
      return <Mail size={20} />;
    case 'trending-up':
      return <TrendingUp size={20} />;
    case 'sparkles':
      return <Sparkles size={20} />;
    case 'shield-alert':
      return <ShieldAlert size={20} />;
    case 'file-spreadsheet':
      return <FileSpreadsheet size={20} />;
    case 'users':
      return <Users size={20} />;
  }
}

export function LandingFeatureCard({ feature }: LandingFeatureCardProps) {
  const classes = landingFeaturesStyles();

  return (
    <div className={classes.card}>
      <div className={classes.cardHeader}>
        <div className={classes.iconBox}>{renderFeatureIcon(feature.iconName)}</div>
        <span className={classes.badge}>{feature.badge}</span>
      </div>

      <h3 className={classes.cardTitle}>{feature.title}</h3>
      <p className={classes.catchphrase}>{feature.catchphrase}</p>
      <p className={classes.description}>{feature.description}</p>
    </div>
  );
}

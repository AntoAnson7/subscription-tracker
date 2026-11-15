export type FeatureIconName =
  'mail' | 'trending-up' | 'sparkles' | 'shield-alert' | 'file-spreadsheet' | 'users';

export interface LandingFeature {
  id: string;
  title: string;
  catchphrase: string;
  description: string;
  badge: string;
  iconName: FeatureIconName;
}

export interface LandingFaq {
  id: string;
  question: string;
  answer: string;
}

export type MetricIconName = 'wallet' | 'shield' | 'lock' | 'zap';

export interface LandingMetric {
  id: string;
  value: string;
  label: string;
  subtext: string;
  iconName: MetricIconName;
}

export interface DemoSubscription {
  id: string;
  name: string;
  category: string;
  monthlyCost: number;
  annualOptimizedCost: number;
  badgeType: 'price-hike' | 'trial' | 'savings' | 'shared';
  badgeText: string;
  subdetail: string;
}

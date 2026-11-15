import { DemoSubscription, LandingMetric } from '@/modules/landing/types/landing.types';

export const LANDING_METRICS: LandingMetric[] = [
  {
    id: 'savings',
    value: '$420+',
    label: 'Avg Annual Savings',
    subtext: 'Recovered via billing cycle optimization & zombie sub cancellation',
    iconName: 'wallet',
  },
  {
    id: 'trials',
    value: '0 Traps',
    label: 'Forgotten Free Trials',
    subtext: 'Shielded by proactive 48-hour expiration countdown alerts',
    iconName: 'shield',
  },
  {
    id: 'privacy',
    value: '100%',
    label: 'Client-Side Privacy',
    subtext: 'Bank-grade local storage with read-only OAuth credentials',
    iconName: 'lock',
  },
  {
    id: 'speed',
    value: '< 30s',
    label: 'Instant Onboarding',
    subtext: 'Scan your footprint from Gmail receipts in under thirty seconds',
    iconName: 'zap',
  },
];

export const DEMO_PREVIEW_SUBS: DemoSubscription[] = [
  {
    id: 'sub-netflix',
    name: 'Netflix Premium',
    category: 'Entertainment',
    monthlyCost: 22.99,
    annualOptimizedCost: 18.99,
    badgeType: 'price-hike',
    badgeText: '+15% Hike Alert',
    subdetail: 'Was $19.99/mo • +$36.00/yr impact',
  },
  {
    id: 'sub-adobe',
    name: 'Adobe Creative Cloud',
    category: 'Productivity',
    monthlyCost: 54.99,
    annualOptimizedCost: 44.99,
    badgeType: 'trial',
    badgeText: 'Trial Ends in 3 Days',
    subdetail: 'Cancel before $659.88/yr charge',
  },
  {
    id: 'sub-chatgpt',
    name: 'ChatGPT Plus',
    category: 'Utilities',
    monthlyCost: 20.0,
    annualOptimizedCost: 16.67,
    badgeType: 'savings',
    badgeText: 'Save $40.00/yr',
    subdetail: 'Switch to Annual Billing',
  },
  {
    id: 'sub-spotify',
    name: 'Spotify Family',
    category: 'Entertainment',
    monthlyCost: 4.25,
    annualOptimizedCost: 4.25,
    badgeType: 'shared',
    badgeText: 'Shared (4 Members)',
    subdetail: 'Total $16.99/mo • You pay $4.25',
  },
];

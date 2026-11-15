import { LandingFeature } from '@/modules/landing/types/landing.types';

export const LANDING_FEATURES: LandingFeature[] = [
  {
    id: 'gmail-sync',
    title: 'Zero-Effort Inbox Sync',
    catchphrase: 'Never type a subscription receipt manually again.',
    description:
      'Connect once with Google read-only privacy. SubTrack scans past & incoming receipts to automatically extract vendors, debits, billing intervals, and renewal dates.',
    badge: 'Automated Detection',
    iconName: 'mail',
  },
  {
    id: 'price-hike',
    title: 'Stealth Price Hike Radar',
    catchphrase: 'Catch silent $2 to $10 increases before they drain your bank account.',
    description:
      'Detects when renewal charges exceed previous baselines. Highlights percentage hikes, measures annual run-rate impact, and updates your budget in 1 tap.',
    badge: 'Hike Protection',
    iconName: 'trending-up',
  },
  {
    id: 'savings-optimizer',
    title: 'Annual Savings Optimizer',
    catchphrase: 'Pay less for software you already use.',
    description:
      'Identifies monthly subscriptions offering steep annual discounts. Discover an average of $350+ in yearly savings with zero changes to your plan tiers.',
    badge: 'Avg $350+ Saved',
    iconName: 'sparkles',
  },
  {
    id: 'trial-shields',
    title: 'Renewal Radar & Trial Shields',
    catchphrase: 'Cancel on time, every time.',
    description:
      'Active countdowns for 7, 14, and 30-day trials. Receive proactive notifications before accidental auto-renewals charge $99+ for an entire year.',
    badge: 'Zero Surprises',
    iconName: 'shield-alert',
  },
  {
    id: 'tax-export',
    title: '1-Click Tax & Reimbursement Export',
    catchphrase: 'IRS and corporate expense reports in seconds.',
    description:
      'Generate formatted CSV spreadsheets and printable PDF summaries of all business expenses with category breakdowns, dates, and family split adjustments.',
    badge: 'IRS & CPA Ready',
    iconName: 'file-spreadsheet',
  },
  {
    id: 'family-plans',
    title: 'Shared Plans & Family Cost Splitting',
    catchphrase: 'Fair shares for group subscriptions.',
    description:
      'Divide Spotify, Apple One, or YouTube Family costs among members. Your dashboard reflects your true out-of-pocket share rather than skewing your run rate.',
    badge: 'Group Intelligence',
    iconName: 'users',
  },
];

import { AppleStory } from '@/modules/landing/types/landing.types';

export const APPLE_STORIES: AppleStory[] = [
  {
    id: 'hike-radar',
    eyebrow: 'PRICE RADAR',
    headline: 'The stealth increase. Caught cold.',
    description:
      'Streaming went up $3. Your workspace tool went up $5. When receipts land in your inbox, Subwise compares debits to your historical rate in real time, so creeping fees never slip past unnoticed.',
    visualType: 'hike-radar',
    statValue: '+15%',
    statLabel: 'Average unnotified subscription price jump detected',
  },
  {
    id: 'annual-switch',
    eyebrow: 'OPTIMIZATION',
    headline: 'Two months free. Hiding in plain sight.',
    description:
      'Most software providers offer 16% to 20% discounts for annual billing. Subwise identifies candidate subscriptions, calculates your net annual dividend, and gives you a single number: your potential yearly savings.',
    visualType: 'annual-switch',
    statValue: '$358/yr',
    statLabel: 'Average annual savings unlocked per member',
  },
  {
    id: 'trial-shield',
    eyebrow: 'RENEWAL RADAR',
    headline: 'The 7-day trap. Disarmed.',
    description:
      'Free trials rely on forgetfulness. Subwise activates proactive countdown alerts 48 hours before promotional periods convert into full-year commitments.',
    visualType: 'trial-shield',
    statValue: '0 Traps',
    statLabel: 'Zero accidental annual conversions',
  },
  {
    id: 'local-privacy',
    eyebrow: 'SECURITY',
    headline: 'Your inbox stays yours. Always.',
    description:
      'Subwise connects via official read-only Google OAuth and parses receipts locally in your browser sandbox. No email text leaves your machine. No ad tracking. No data brokers.',
    visualType: 'local-privacy',
    statValue: '100%',
    statLabel: 'Client-side processing & privacy by architecture',
  },
];

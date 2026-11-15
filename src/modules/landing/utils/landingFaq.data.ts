import { LandingFaq } from '@/modules/landing/types/landing.types';

export const LANDING_FAQS: LandingFaq[] = [
  {
    id: 'how-sync-works',
    question: 'How does Gmail sync work, and is my email data safe?',
    answer:
      'SubTrack uses official Google OAuth with restricted, read-only Gmail access. We only scan subject lines and receipts matching verified digital billing senders. Your emails are never read by humans, never transferred to external servers, and never sold to advertisers.',
  },
  {
    id: 'without-gmail',
    question: 'Can I use SubTrack without connecting my Google account?',
    answer:
      'Yes! SubTrack includes a complete manual tracking suite with auto-completing brand presets (Netflix, Spotify, AWS, GitHub, etc.), cycle converters, and family split calculations. You can test drive the full application directly via our interactive demo.',
  },
  {
    id: 'price-hikes',
    question: 'How does the Stealth Price Hike Radar work?',
    answer:
      'Whenever SubTrack indexes a new receipt for an active subscription, it compares the charged amount to your stored baseline. If Netflix or Adobe hikes fees by even $1.00, SubTrack displays a warning banner with the annual impact and a 1-click update option.',
  },
  {
    id: 'savings-optimizer',
    question: 'How does the Annual vs. Monthly Savings Optimizer calculate savings?',
    answer:
      'Most software services offer a 15% to 20% discount (equivalent to 2 months free) when billed annually rather than monthly. The optimizer audits your recurring monthly commitments and reveals exactly how much cash you unlock by switching to annual billing.',
  },
  {
    id: 'export-data',
    question: 'Can I export my data for tax filing or work reimbursements?',
    answer:
      'Absolutely. SubTrack features a built-in one-click exporter that generates clean CSV spreadsheets or printable, beautifully styled PDF summaries categorized for IRS expense schedules or employer expense reimbursement.',
  },
  {
    id: 'pricing',
    question: 'Is SubTrack free to use?',
    answer:
      'Yes, SubTrack is free to use with full local client-side tracking, Google email syncing, price hike detection, and export capabilities.',
  },
];

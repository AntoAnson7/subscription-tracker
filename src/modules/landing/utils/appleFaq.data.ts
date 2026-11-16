import { LandingFaq } from '@/modules/landing/types/landing.types';

export const APPLE_FAQS: LandingFaq[] = [
  {
    id: 'apple-privacy',
    question: 'How does Subwise protect my privacy when accessing Gmail?',
    answer:
      'Subwise requests restricted, read-only permission strictly to find digital receipts and invoices. Parsing executes inside your browser session, and email bodies are never stored on external databases or shared with third parties.',
  },
  {
    id: 'apple-manual',
    question: 'Can I track subscriptions manually without connecting an email?',
    answer:
      'Yes. You can add subscriptions manually with one-tap presets (Netflix, Figma, Spotify, Claude, AWS, etc.), set up billing cycles, and calculate family split expenses with zero accounts linked.',
  },
  {
    id: 'apple-hikes',
    question: 'How are stealth price increases identified?',
    answer:
      'Subwise indexes verified receipt charges against your registered base cost. If a recurring bill increases by even $0.50, you receive an immediate alert showing the percentage jump, the annual budget impact, and a one-click option to update.',
  },
  {
    id: 'apple-pricing',
    question: 'What does Subwise cost?',
    answer:
      'Subwise is completely free to use. All core capabilities—including Gmail receipt parsing, price hike alerts, savings optimization, and CSV/PDF export—are included without paywalls.',
  },
];

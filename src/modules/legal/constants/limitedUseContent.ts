import { LegalDocument } from '@/modules/legal/types/legal.types';

export const googleLimitedUseDocument: LegalDocument = {
  id: 'google-limited-use',
  tabLabel: 'Google API Limited Use',
  title: 'Google API Services User Data Policy Disclosure',
  subtitle: 'Our strict adherence to Google Limited Use requirements and consumer protections.',
  lastUpdated: 'November 15, 2026',
  sections: [
    {
      heading: 'Mandatory Policy Disclosure',
      body: [
        'SubTrack’s use and transfer to any other app of information received from Google APIs will adhere to the Google API Services User Data Policy, including the Limited Use requirements.',
      ],
      isCallout: true,
    },
    {
      heading: '1. Specific Prohibitions We Strictly Enforce',
      body: [
        'No Advertising: SubTrack does not use or transfer your Google user data for serving advertisements, including personalized, re-targeted, or interest-based advertising.',
        'No Generalized AI Training: Google user data is strictly prohibited from being used to train generalized artificial intelligence or machine learning models.',
        'No Sale or Monetization: We never sell or transfer your email data, receipts, or contact lists to data brokers or third parties for marketing purposes.',
      ],
    },
    {
      heading: '2. Minimal Scope & Targeted Use',
      body: [
        'We only request the https://www.googleapis.com/auth/gmail.readonly scope to execute narrow, search-filtered queries for transactional receipts.',
        'Data read from the Gmail API is used exclusively to display your subscriptions, next renewal dates, and payment history in your private SubTrack interface.',
      ],
    },
    {
      heading: '3. Human Access Restrictions',
      body: [
        'Humans do not read your email messages. In extremely rare technical troubleshooting scenarios, access would only occur if you provide prior affirmative consent for a specific message, or where required by law.',
      ],
    },
  ],
};

export const securityPolicyDocument: LegalDocument = {
  id: 'security',
  tabLabel: 'Security',
  title: 'Security & Architecture Overview',
  subtitle: 'How SubTrack isolates your data and guarantees zero email retention.',
  lastUpdated: 'November 15, 2026',
  sections: [
    {
      heading: '1. Client-Side Processing Architecture',
      body: [
        'SubTrack employs a zero-retention architecture. When scanning for receipts, email contents are fetched directly from Google’s REST API to your browser session via HTTPS.',
        'Receipt parsing and pattern matching occur locally in your browser. The raw email body is discarded immediately after extracting the merchant name and renewal cost.',
      ],
    },
    {
      heading: '2. Token Security & Lifetime',
      body: [
        'OAuth tokens are kept strictly in authenticated client storage with short expiration windows. No refresh tokens with perpetual offline access are stored on unsecured servers.',
        'When you unlink an email account, your access token is purged immediately from memory and storage.',
      ],
    },
    {
      heading: '3. Transport Encryption',
      body: [
        'All communications between SubTrack, Google APIs, and Supabase are encrypted using modern Transport Layer Security (TLS 1.3).',
      ],
    },
  ],
};

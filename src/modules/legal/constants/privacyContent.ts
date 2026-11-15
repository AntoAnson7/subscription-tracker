import { LegalDocument } from '@/modules/legal/types/legal.types';

export const privacyPolicyDocument: LegalDocument = {
  id: 'privacy',
  tabLabel: 'Privacy Policy',
  title: 'Privacy Policy',
  subtitle: 'How SubTrack collects, uses, protects, and handles your personal data.',
  lastUpdated: 'November 15, 2026',
  sections: [
    {
      heading: '1. Overview & Commitment',
      body: [
        'SubTrack ("we", "our", or "us") values your privacy above all else. This Privacy Policy describes how we handle information when you use our application to track recurring subscriptions, run-rates, and renewal schedules.',
        'We believe in zero-retention privacy: we only access the minimal data strictly necessary to provide subscription management features, and we never monetize your personal information.',
      ],
    },
    {
      heading: '2. Google User Data & Gmail API Access',
      body: [
        'When you choose to link a Gmail account, SubTrack requests read-only access under the "https://www.googleapis.com/auth/gmail.readonly" and "userinfo.email" scopes.',
        'Purpose of Access: We query your Gmail inbox solely to locate transactional receipts, billing invoices, payment debit confirmations, and subscription renewal alerts from vendors (e.g., Netflix, Spotify, AWS, Google Workspace).',
        'Targeted Querying: SubTrack only searches for specific transactional messages using targeted keyword filters. We never search, access, or open your personal correspondence or private messages.',
      ],
    },
    {
      heading: '3. Google API Services Limited Use Compliance',
      body: [
        'SubTrack’s use and transfer to any other app of information received from Google APIs will adhere to the Google API Services User Data Policy, including the Limited Use requirements.',
        'No Advertising: Google user data is never used or transferred to serve personalized, re-targeted, or interest-based advertisements.',
        'No Generalized AI Training: Google user data is never used or transferred to train generalized artificial intelligence or machine learning models.',
        'No Human Access: No human employees, contractors, or administrators are permitted to read your email messages unless you provide explicit affirmative agreement for specific messages, or as strictly required to comply with law or investigate security abuse.',
        'No Sale or Third-Party Transfer: We do not sell, rent, or transfer your Google user data to any third party.',
      ],
      isCallout: true,
    },
    {
      heading: '4. Data Storage & Zero Email Retention',
      body: [
        'SubTrack does not store the body or contents of your emails on external servers. Email parsing happens client-side directly within your authenticated session.',
        'Only the resulting extracted metadata (merchant name, renewal date, subscription cost, currency) is saved to your private account so it can appear on your dashboard and calendar.',
      ],
    },
    {
      heading: '5. Account Unlinking & Data Revocation',
      body: [
        'You have full control over your connected accounts at all times. You can unlink your Gmail account with one click in your Profile Settings, which immediately deletes the cached OAuth token.',
        'You can also revoke SubTrack’s access at any moment through Google Security Account Settings at https://myaccount.google.com/permissions.',
      ],
    },
    {
      heading: '6. Contact Us',
      body: [
        'If you have questions about this Privacy Policy or wish to request complete deletion of your account and metadata, please contact us at support@subtrack.app or antoanson6@gmail.com.',
      ],
    },
  ],
};

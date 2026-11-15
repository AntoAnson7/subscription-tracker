import { LegalDocument } from '@/modules/legal/types/legal.types';

export const termsOfServiceDocument: LegalDocument = {
  id: 'terms',
  tabLabel: 'Terms of Service',
  title: 'Terms of Service',
  subtitle: 'The terms and conditions governing your use of the SubTrack platform.',
  lastUpdated: 'November 15, 2026',
  sections: [
    {
      heading: '1. Acceptance of Terms',
      body: [
        'By accessing or using SubTrack, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using the application.',
      ],
    },
    {
      heading: '2. Description of Service',
      body: [
        'SubTrack is a personal expense management and subscription tracking tool designed to help users track recurring subscription costs, compute monthly run-rates, monitor renewal dates, and organize shared family plans.',
        'SubTrack is provided as an informational tracking tool and does not provide financial, accounting, legal, or tax advice. You remain responsible for verifying billing accuracy with your service providers.',
      ],
    },
    {
      heading: '3. Acceptable Use',
      body: [
        'You agree to use SubTrack only for lawful personal or internal business purposes. You agree not to attempt to reverse engineer, disrupt, or bypass any security features or authentication controls.',
        'You may only link email accounts and payment records for which you are the authorized account holder.',
      ],
    },
    {
      heading: '4. Third-Party Integrations',
      body: [
        'SubTrack may allow integration with third-party providers (such as Google OAuth and Gmail API). Your use of these services is subject to their respective terms of service and user data policies.',
      ],
    },
    {
      heading: '5. Limitation of Liability',
      body: [
        'To the maximum extent permitted by applicable law, SubTrack and its developers shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your access to or inability to use the service.',
      ],
    },
    {
      heading: '6. Termination & Modifications',
      body: [
        'We reserve the right to modify these terms or discontinue features at any time. Continued use of the platform following any modifications constitutes acceptance of the revised terms.',
      ],
    },
  ],
};

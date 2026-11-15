import googleLimitedUseMd from '@/modules/legal/content/google-limited-use.md?raw';
import privacyPolicyMd from '@/modules/legal/content/privacy-policy.md?raw';
import securityPolicyMd from '@/modules/legal/content/security-policy.md?raw';
import termsOfServiceMd from '@/modules/legal/content/terms-of-service.md?raw';
import { LegalDocumentItem, LegalTab } from '@/modules/legal/types/legal.types';

export const ALL_LEGAL_DOCUMENTS: LegalDocumentItem[] = [
  { id: 'privacy', tabLabel: 'Privacy Policy', markdown: privacyPolicyMd },
  { id: 'terms', tabLabel: 'Terms of Service', markdown: termsOfServiceMd },
  { id: 'google-limited-use', tabLabel: 'Google Limited Use', markdown: googleLimitedUseMd },
  { id: 'security', tabLabel: 'Security', markdown: securityPolicyMd },
];

export function getLegalDocument(id: LegalTab): LegalDocumentItem {
  const found = ALL_LEGAL_DOCUMENTS.find((doc) => doc.id === id);
  return found ?? ALL_LEGAL_DOCUMENTS[0];
}

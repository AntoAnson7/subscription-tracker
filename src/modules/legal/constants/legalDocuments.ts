import {
  googleLimitedUseDocument,
  securityPolicyDocument,
} from '@/modules/legal/constants/limitedUseContent';
import { privacyPolicyDocument } from '@/modules/legal/constants/privacyContent';
import { termsOfServiceDocument } from '@/modules/legal/constants/termsContent';
import { LegalDocument, LegalTab } from '@/modules/legal/types/legal.types';

export const ALL_LEGAL_DOCUMENTS: LegalDocument[] = [
  privacyPolicyDocument,
  termsOfServiceDocument,
  googleLimitedUseDocument,
  securityPolicyDocument,
];

export function getLegalDocument(id: LegalTab): LegalDocument {
  const found = ALL_LEGAL_DOCUMENTS.find((doc) => doc.id === id);
  return found ?? privacyPolicyDocument;
}

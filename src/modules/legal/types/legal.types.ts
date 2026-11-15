export type LegalTab = 'privacy' | 'terms' | 'google-limited-use' | 'security';

export interface LegalDocumentItem {
  id: LegalTab;
  tabLabel: string;
  markdown: string;
}

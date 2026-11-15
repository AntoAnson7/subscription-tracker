export type LegalTab = 'privacy' | 'terms' | 'google-limited-use' | 'security';

export interface LegalSection {
  heading: string;
  body: string[];
  isCallout?: boolean;
}

export interface LegalDocument {
  id: LegalTab;
  tabLabel: string;
  title: string;
  subtitle: string;
  lastUpdated: string;
  sections: LegalSection[];
}

export type ShowcaseTab = 'overview' | 'hikes' | 'savings';

export interface AppleStory {
  id: string;
  eyebrow: string;
  headline: string;
  description: string;
  visualType: 'hike-radar' | 'annual-switch' | 'trial-shield' | 'local-privacy';
  statValue?: string;
  statLabel?: string;
}

export interface SpecRow {
  feature: string;
  subtrack: string | boolean;
  traditional: string | boolean;
  spreadsheets: string | boolean;
}

export interface LandingFaq {
  id: string;
  question: string;
  answer: string;
}

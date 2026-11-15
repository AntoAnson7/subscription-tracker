export type BillingCycle = 'weekly' | 'monthly' | 'quarterly' | 'semi_annually' | 'yearly';

export type SubscriptionStatus = 'active' | 'trial' | 'paused' | 'cancelled';

export type SubscriptionCategory =
  | 'Entertainment'
  | 'Productivity & AI'
  | 'Bundled Services'
  | 'Developer Tools'
  | 'Design & Craft'
  | 'Health & Fitness'
  | 'Cloud & Hosting'
  | 'Utilities'
  | 'Other';

export interface Subscription {
  id: string;
  name: string;
  category: SubscriptionCategory;
  cost: number;
  currency: string;
  cycle: BillingCycle;
  monthlyEquivalent: number;
  startDate: string;
  renewalDate: string;
  daysRemaining: number;
  status: SubscriptionStatus;
  brandColor: string;
  iconSlug: string | null;
  cancellationUrl: string | null;
  websiteUrl: string | null;
  notes: string | null;
  isFamily?: boolean;
  splitCount?: number;
  totalCost?: number;
}

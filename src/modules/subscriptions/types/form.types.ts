import {
  BillingCycle,
  SubscriptionCategory,
  SubscriptionStatus,
} from '@/modules/subscriptions/types/subscription.types';

export interface SubscriptionFormData {
  name: string;
  category: SubscriptionCategory;
  cost: number;
  currency: string;
  cycle: BillingCycle;
  startDate: string;
  renewalDate: string;
  status: SubscriptionStatus;
  brandColor: string;
  iconSlug: string | null;
  cancellationUrl: string | null;
  websiteUrl: string | null;
  notes: string | null;
  isFamily?: boolean;
  splitCount?: number;
}

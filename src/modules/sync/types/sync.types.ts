import {
  BillingCycle,
  SubscriptionCategory,
} from '@/modules/subscriptions/types/subscription.types';

export type EmailProvider = 'gmail' | 'outlook' | 'custom';

export type SyncStatus = 'idle' | 'syncing' | 'completed' | 'error';

export interface LinkedEmailAccount {
  id: string;
  userId: string | null;
  email: string;
  provider: EmailProvider;
  linkedAt: string;
  lastSyncedAt: string | null;
  status: 'active' | 'syncing' | 'error';
  isSimulated: boolean;
  grantedPermissions: string[];
  accessToken?: string;
  tokenExpiresAt?: number;
}

export interface EmailReceipt {
  id: string;
  accountEmail: string;
  subject: string;
  sender: string;
  date: string;
  snippet: string;
  bodyText: string;
  messageId: string;
}

export type DetectedEventType =
  'new_subscription' | 'payment_debit' | 'cancellation' | 'trial_expiry';

export interface DiscoveredSubscription {
  id: string;
  accountEmail: string;
  name: string;
  category: SubscriptionCategory;
  cost: number;
  currency: string;
  cycle: BillingCycle;
  renewalDate: string;
  brandColor: string;
  iconSlug: string | null;
  sourceEmailSubject: string;
  confidence: number;
  isSelected: boolean;
}

export interface PaymentRecord {
  id: string;
  subscriptionId: string;
  subscriptionName: string;
  amount: number;
  currency: string;
  paymentDate: string;
  sourceEmail: string;
  sourceMessageId: string;
  sourceSubject: string;
}

export interface CancellationAlert {
  id: string;
  subscriptionId: string;
  subscriptionName: string;
  accountEmail: string;
  detectedDate: string;
  sourceSubject: string;
  status: 'pending' | 'confirmed' | 'dismissed';
}

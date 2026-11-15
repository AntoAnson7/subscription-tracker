import { SubscriptionCategory } from '@/modules/subscriptions/types/subscription.types';
import { POPULAR_BRANDS } from '@/modules/subscriptions/utils/brandPresets.utils';
import {
  DetectedEventType,
  DiscoveredSubscription,
  EmailReceipt,
  PaymentRecord,
} from '@/modules/sync/types/sync.types';

export interface ParsedEmailResult {
  eventType: DetectedEventType;
  merchantName: string;
  category: SubscriptionCategory;
  cost: number;
  currency: string;
  renewalDate: string;
  brandColor: string;
  iconSlug: string | null;
}

function detectEventType(text: string): DetectedEventType {
  const lower = text.toLowerCase();
  if (lower.includes('cancel') || lower.includes('ended') || lower.includes('terminated')) {
    return 'cancellation';
  }
  if (lower.includes('debited') || lower.includes('receipt for') || lower.includes('invoice #')) {
    return 'payment_debit';
  }
  return 'new_subscription';
}

function extractCurrencyAndAmount(text: string): { amount: number; currency: string } {
  const inrMatch = text.match(/(?:₹|Rs\.?|INR)\s*([\d,]+(?:\.\d{1,2})?)/i);
  if (inrMatch) {
    return { amount: parseFloat(inrMatch[1].replace(/,/g, '')), currency: 'INR' };
  }
  const usdMatch = text.match(/(?:\$|USD)\s*([\d,]+(?:\.\d{1,2})?)/i);
  if (usdMatch) {
    return { amount: parseFloat(usdMatch[1].replace(/,/g, '')), currency: 'USD' };
  }
  const eurMatch = text.match(/(?:€|EUR)\s*([\d,]+(?:\.\d{1,2})?)/i);
  if (eurMatch) {
    return { amount: parseFloat(eurMatch[1].replace(/,/g, '')), currency: 'EUR' };
  }
  return { amount: 9.99, currency: 'USD' };
}

function resolveMerchant(text: string) {
  const lower = text.toLowerCase();
  for (const brand of POPULAR_BRANDS) {
    if (lower.includes(brand.name.toLowerCase()) || lower.includes(brand.iconSlug)) {
      return brand;
    }
  }
  if (lower.includes('claude') || lower.includes('anthropic')) {
    return {
      name: 'Claude Pro',
      category: 'Productivity & AI' as SubscriptionCategory,
      brandColor: '#D97706',
      iconSlug: 'anthropic',
    };
  }
  if (lower.includes('hotstar') || lower.includes('disney')) {
    return {
      name: 'Disney+ Hotstar',
      category: 'Entertainment' as SubscriptionCategory,
      brandColor: '#113CCF',
      iconSlug: 'disney',
    };
  }
  if (lower.includes('icloud')) {
    return {
      name: 'iCloud+ Storage',
      category: 'Cloud & Hosting' as SubscriptionCategory,
      brandColor: '#0070c9',
      iconSlug: 'apple',
    };
  }
  return {
    name: 'Online Subscription',
    category: 'Other' as SubscriptionCategory,
    brandColor: '#4F46E5',
    iconSlug: null,
  };
}

export function parseEmailReceipt(receipt: EmailReceipt): ParsedEmailResult {
  const combined = `${receipt.subject} ${receipt.snippet} ${receipt.bodyText}`;
  const eventType = detectEventType(combined);
  const merchant = resolveMerchant(combined);
  const { amount, currency } = extractCurrencyAndAmount(combined);

  const renewalMatch = combined.match(/(\d{4}-\d{2}-\d{2})/);
  const renewalDate =
    renewalMatch?.[1] ?? new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0];

  return {
    eventType,
    merchantName: merchant.name,
    category: merchant.category,
    cost: amount,
    currency,
    renewalDate,
    brandColor: merchant.brandColor,
    iconSlug: merchant.iconSlug,
  };
}

export function toDiscoveredSub(
  receipt: EmailReceipt,
  parsed: ParsedEmailResult
): DiscoveredSubscription {
  return {
    id: `disc-${receipt.id}`,
    accountEmail: receipt.accountEmail,
    name: parsed.merchantName,
    category: parsed.category,
    cost: parsed.cost,
    currency: parsed.currency,
    cycle: 'monthly',
    renewalDate: parsed.renewalDate,
    brandColor: parsed.brandColor,
    iconSlug: parsed.iconSlug,
    sourceEmailSubject: receipt.subject,
    confidence: 0.95,
    isSelected: true,
  };
}

export function toPaymentRecord(
  receipt: EmailReceipt,
  parsed: ParsedEmailResult,
  subscriptionId: string
): PaymentRecord {
  return {
    id: `pay-${receipt.id}`,
    subscriptionId,
    subscriptionName: parsed.merchantName,
    amount: parsed.cost,
    currency: parsed.currency,
    paymentDate: receipt.date,
    sourceEmail: receipt.accountEmail,
    sourceMessageId: receipt.messageId,
    sourceSubject: receipt.subject,
  };
}

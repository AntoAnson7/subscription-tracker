import { getDaysUntil } from '@/modules/common/utils/date.utils';
import { SubscriptionFormData } from '@/modules/subscriptions/types/form.types';
import {
  BillingCycle,
  Subscription,
  SubscriptionCategory,
  SubscriptionStatus,
} from '@/modules/subscriptions/types/subscription.types';
import { toMonthlyCost } from '@/modules/subscriptions/utils/normalization.utils';

export interface DbSubscriptionRow {
  id: string;
  user_id: string;
  name: string;
  category: string;
  cost: number;
  currency: string;
  cycle: string;
  start_date: string;
  renewal_date: string;
  status: string;
  brand_color: string;
  icon_slug: string | null;
  cancellation_url: string | null;
  website_url: string | null;
  notes: string | null;
}

export function fromDbRow(row: DbSubscriptionRow): Subscription {
  const cycle = row.cycle as BillingCycle;
  const status = row.status as SubscriptionStatus;
  const cost = Number(row.cost);

  let isFamily: boolean | undefined;
  let splitCount: number | undefined;
  let totalCost: number | undefined;
  let notes = row.notes;

  if (row.notes && row.notes.startsWith('{"__family":true')) {
    try {
      const meta = JSON.parse(row.notes);
      if (meta.__family) {
        isFamily = true;
        splitCount = meta.splitCount;
        totalCost = meta.totalCost;
        notes = meta.rawNotes ?? null;
      }
    } catch {
      // fallback
    }
  }

  return {
    id: row.id,
    name: row.name,
    category: row.category as SubscriptionCategory,
    cost,
    currency: row.currency,
    cycle,
    monthlyEquivalent: toMonthlyCost(cost, cycle),
    startDate: row.start_date,
    renewalDate: row.renewal_date,
    daysRemaining: getDaysUntil(row.renewal_date),
    status,
    brandColor: row.brand_color,
    iconSlug: row.icon_slug,
    cancellationUrl: row.cancellation_url,
    websiteUrl: row.website_url,
    notes,
    isFamily,
    splitCount,
    totalCost,
  };
}

export function toDbInsert(
  sub: Omit<Subscription, 'id' | 'daysRemaining' | 'monthlyEquivalent'>,
  userId: string
) {
  let notesStr = sub.notes;
  if (sub.isFamily) {
    notesStr = JSON.stringify({
      __family: true,
      splitCount: sub.splitCount ?? 2,
      totalCost: sub.totalCost ?? sub.cost,
      rawNotes: sub.notes,
    });
  }

  return {
    user_id: userId,
    name: sub.name,
    category: sub.category,
    cost: sub.cost,
    currency: sub.currency,
    cycle: sub.cycle,
    start_date: sub.startDate,
    renewal_date: sub.renewalDate,
    status: sub.status,
    brand_color: sub.brandColor,
    icon_slug: sub.iconSlug,
    cancellation_url: sub.cancellationUrl,
    website_url: sub.websiteUrl,
    notes: notesStr,
  };
}

export function toFormData(sub: Subscription): SubscriptionFormData {
  return {
    name: sub.name,
    category: sub.category,
    cost: sub.isFamily && sub.totalCost ? sub.totalCost : sub.cost,
    currency: sub.currency,
    cycle: sub.cycle,
    startDate: sub.startDate,
    renewalDate: sub.renewalDate,
    status: sub.status,
    brandColor: sub.brandColor,
    iconSlug: sub.iconSlug,
    cancellationUrl: sub.cancellationUrl,
    websiteUrl: sub.websiteUrl,
    notes: sub.notes,
    isFamily: sub.isFamily ?? false,
    splitCount: sub.splitCount ?? 2,
  };
}

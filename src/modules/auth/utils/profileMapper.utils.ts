import { CreateProfileData, TrackingFocus, UserProfile } from '@/modules/auth/types/auth.types';

export interface DbProfileRow {
  id: string;
  full_name: string;
  preferred_currency: string;
  tracking_focus: string;
  avatar_url: string | null;
  created_at: string;
}

export function fromDbProfile(row: DbProfileRow): UserProfile {
  return {
    id: row.id,
    fullName: row.full_name,
    preferredCurrency: row.preferred_currency,
    trackingFocus: (row.tracking_focus as TrackingFocus) || 'Personal',
    avatarUrl: row.avatar_url,
    createdAt: row.created_at,
  };
}

export function toDbProfileInsert(
  userId: string,
  data: CreateProfileData,
  avatarUrl: string | null
) {
  return {
    id: userId,
    full_name: data.fullName,
    preferred_currency: data.preferredCurrency,
    tracking_focus: data.trackingFocus,
    avatar_url: avatarUrl,
  };
}

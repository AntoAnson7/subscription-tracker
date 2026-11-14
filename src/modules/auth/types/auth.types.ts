import { User } from '@supabase/supabase-js';

export type TrackingFocus = 'Personal' | 'Work & Business' | 'Family Sharing';

export interface UserProfile {
  id: string;
  fullName: string;
  preferredCurrency: string;
  trackingFocus: TrackingFocus;
  avatarUrl: string | null;
  createdAt: string;
}

export interface CreateProfileData {
  fullName: string;
  preferredCurrency: string;
  trackingFocus: TrackingFocus;
}

export interface AuthState {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  needsOnboarding: boolean;
  error: string | null;
}

import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { CreateProfileData, TrackingFocus, UserProfile } from '@/modules/auth/types/auth.types';
import {
  DbProfileRow,
  fromDbProfile,
  toDbProfileInsert,
} from '@/modules/auth/utils/profileMapper.utils';
import { supabase } from '@/modules/common/utils/supabase';

function getStoredProfile(userId: string): UserProfile | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(`subtrack-profile-${userId}`);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as UserProfile;
  } catch {
    return null;
  }
}

function resolveProfile(user: User | null): UserProfile | null {
  if (!user?.id) return null;
  const cached = getStoredProfile(user.id);
  if (cached) return cached;
  if (user.user_metadata?.onboarded) {
    return {
      id: user.id,
      fullName:
        (user.user_metadata.full_name as string) || (user.user_metadata.name as string) || 'User',
      preferredCurrency: (user.user_metadata.preferred_currency as string) || 'USD',
      trackingFocus: (user.user_metadata.tracking_focus as TrackingFocus) || 'Personal',
      avatarUrl:
        (user.user_metadata.avatar_url as string) || (user.user_metadata.picture as string) || null,
      createdAt: new Date().toISOString(),
    };
  }
  return null;
}

export function useProfile(user: User | null) {
  const [profile, setProfile] = useState<UserProfile | null>(() => resolveProfile(user));
  const [loading, setLoading] = useState(() =>
    Boolean(user?.id && !resolveProfile(user) && supabase)
  );
  const [isNewUser, setIsNewUser] = useState(false);

  const currentProfile = profile ?? resolveProfile(user);

  useEffect(() => {
    if (!user?.id || currentProfile) {
      return;
    }

    let ignore = false;
    if (supabase) {
      supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle()
        .then(({ data, error }) => {
          if (ignore) return;
          if (!error && data) {
            const parsed = fromDbProfile(data as unknown as DbProfileRow);
            setProfile(parsed);
            localStorage.setItem(`subtrack-profile-${user.id}`, JSON.stringify(parsed));
            setIsNewUser(false);
          } else {
            setIsNewUser(true);
          }
          setLoading(false);
        });
    }

    return () => {
      ignore = true;
    };
  }, [user?.id, currentProfile]);

  const createProfile = async (data: CreateProfileData): Promise<boolean> => {
    if (!user) return false;
    const avatarUrl =
      (user.user_metadata?.avatar_url as string | undefined) ??
      (user.user_metadata?.picture as string | undefined) ??
      null;

    const newProfile: UserProfile = {
      id: user.id,
      fullName: data.fullName,
      preferredCurrency: data.preferredCurrency,
      trackingFocus: data.trackingFocus,
      avatarUrl,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(`subtrack-profile-${user.id}`, JSON.stringify(newProfile));
    setProfile(newProfile);
    setIsNewUser(false);

    if (supabase) {
      await supabase.auth.updateUser({
        data: {
          full_name: data.fullName,
          preferred_currency: data.preferredCurrency,
          tracking_focus: data.trackingFocus,
          onboarded: true,
        },
      });

      try {
        const payload = toDbProfileInsert(user.id, data, avatarUrl);
        await supabase.from('profiles').upsert(payload);
      } catch {
        // Fallback to auth metadata already saved
      }
    }

    return true;
  };

  return {
    profile: currentProfile,
    loading,
    needsOnboarding: Boolean(user && !currentProfile && isNewUser),
    createProfile,
  };
}

import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/modules/common/utils/supabase';
import { Subscription } from '@/modules/subscriptions/types/subscription.types';
import {
  DbSubscriptionRow,
  fromDbRow,
  toDbInsert,
} from '@/modules/subscriptions/utils/subscriptionMapper.utils';

export function useSubscriptions(userId: string | null = null) {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('subtrack-subscriptions');
      if (saved) {
        try {
          return JSON.parse(saved) as Subscription[];
        } catch {
          return [];
        }
      }
    }
    return [];
  });
  const [loading, setLoading] = useState(() => Boolean(userId && supabase));

  const fetchSubscriptions = useCallback(async () => {
    if (!supabase || !userId) return;
    setLoading(true);
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .order('renewal_date', { ascending: true });

    if (!error && data) {
      const parsed = (data as unknown as DbSubscriptionRow[]).map(fromDbRow);
      setSubscriptions(parsed);
      localStorage.setItem('subtrack-subscriptions', JSON.stringify(parsed));
    }
    setLoading(false);
  }, [userId]);

  useEffect(() => {
    let ignore = false;
    if (userId && supabase) {
      supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', userId)
        .order('renewal_date', { ascending: true })
        .then(({ data, error }) => {
          if (ignore) return;
          if (!error && data) {
            const parsed = (data as unknown as DbSubscriptionRow[]).map(fromDbRow);
            setSubscriptions(parsed);
            localStorage.setItem('subtrack-subscriptions', JSON.stringify(parsed));
          }
          setLoading(false);
        });
    }
    return () => {
      ignore = true;
    };
  }, [userId]);

  const addSubscription = async (
    newSub: Omit<Subscription, 'id' | 'daysRemaining' | 'monthlyEquivalent'>
  ) => {
    if (supabase && userId) {
      const insertPayload = toDbInsert(newSub, userId);
      const { data, error } = await supabase
        .from('subscriptions')
        .insert(insertPayload)
        .select()
        .single();

      if (!error && data) {
        const mapped = fromDbRow(data as unknown as DbSubscriptionRow);
        setSubscriptions((prev) => [mapped, ...prev]);
        return;
      }
    }

    // Local fallback
    const localId = crypto.randomUUID();
    const created: Subscription = {
      ...newSub,
      id: localId,
      monthlyEquivalent: newSub.cost,
      daysRemaining: 30,
    };
    setSubscriptions((prev) => {
      const updated = [created, ...prev];
      localStorage.setItem('subtrack-subscriptions', JSON.stringify(updated));
      return updated;
    });
  };

  const deleteSubscription = async (id: string) => {
    if (supabase && userId) {
      await supabase.from('subscriptions').delete().eq('id', id);
    }
    setSubscriptions((prev) => {
      const updated = prev.filter((s) => s.id !== id);
      localStorage.setItem('subtrack-subscriptions', JSON.stringify(updated));
      return updated;
    });
  };

  return {
    subscriptions,
    loading,
    addSubscription,
    deleteSubscription,
    refresh: fetchSubscriptions,
  };
}

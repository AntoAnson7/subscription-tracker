import { useEffect, useState } from 'react';
import { getDaysUntil } from '@/modules/common/utils/date.utils';
import { supabase } from '@/modules/common/utils/supabase';
import { Subscription } from '@/modules/subscriptions/types/subscription.types';
import { toMonthlyCost } from '@/modules/subscriptions/utils/normalization.utils';
import {
  DbSubscriptionRow,
  fromDbRow,
  toDbInsert,
} from '@/modules/subscriptions/utils/subscriptionMapper.utils';

function saveLocal(subs: Subscription[]) {
  localStorage.setItem('subtrack-subscriptions', JSON.stringify(subs));
}

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

  useEffect(() => {
    if (!supabase || !userId) return;
    supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .order('renewal_date', { ascending: true })
      .then(({ data, error }) => {
        if (!error && data) {
          const parsed = (data as unknown as DbSubscriptionRow[]).map(fromDbRow);
          setSubscriptions(parsed);
          saveLocal(parsed);
        }
        setLoading(false);
      });
  }, [userId]);

  const addSubscription = async (
    newSub: Omit<Subscription, 'id' | 'daysRemaining' | 'monthlyEquivalent'>
  ) => {
    if (supabase && userId) {
      const { data, error } = await supabase
        .from('subscriptions')
        .insert(toDbInsert(newSub, userId))
        .select()
        .single();

      if (!error && data) {
        const mapped = fromDbRow(data as unknown as DbSubscriptionRow);
        setSubscriptions((prev) => [mapped, ...prev]);
        return;
      }
    }

    const localId = crypto.randomUUID();
    const created: Subscription = {
      ...newSub,
      id: localId,
      monthlyEquivalent: toMonthlyCost(newSub.cost, newSub.cycle),
      daysRemaining: getDaysUntil(newSub.renewalDate),
    };
    setSubscriptions((prev) => {
      const updated = [created, ...prev];
      saveLocal(updated);
      return updated;
    });
  };

  const updateSubscription = async (
    id: string,
    updatedData: Omit<Subscription, 'id' | 'daysRemaining' | 'monthlyEquivalent'>
  ) => {
    if (supabase && userId) {
      const { data, error } = await supabase
        .from('subscriptions')
        .update(toDbInsert(updatedData, userId))
        .eq('id', id)
        .eq('user_id', userId)
        .select()
        .single();

      if (!error && data) {
        const mapped = fromDbRow(data as unknown as DbSubscriptionRow);
        setSubscriptions((prev) => prev.map((s) => (s.id === id ? mapped : s)));
        return;
      }
    }

    setSubscriptions((prev) => {
      const updated = prev.map((s) =>
        s.id === id
          ? {
              ...s,
              ...updatedData,
              monthlyEquivalent: toMonthlyCost(updatedData.cost, updatedData.cycle),
              daysRemaining: getDaysUntil(updatedData.renewalDate),
            }
          : s
      );
      saveLocal(updated);
      return updated;
    });
  };

  const deleteSubscription = async (id: string) => {
    if (supabase && userId) {
      await supabase.from('subscriptions').delete().eq('id', id);
    }
    setSubscriptions((prev) => {
      const updated = prev.filter((s) => s.id !== id);
      saveLocal(updated);
      return updated;
    });
  };

  return {
    subscriptions,
    loading,
    addSubscription,
    updateSubscription,
    deleteSubscription,
  };
}

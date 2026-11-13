import { useState } from 'react';
import { Subscription } from '@/modules/subscriptions/types/subscription.types';
import { INITIAL_SUBSCRIPTIONS } from '@/modules/subscriptions/utils/mockData.utils';

export function useSubscriptions() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('subtrack-subscriptions');
      if (saved) {
        try {
          return JSON.parse(saved) as Subscription[];
        } catch {
          return INITIAL_SUBSCRIPTIONS;
        }
      }
    }
    return INITIAL_SUBSCRIPTIONS;
  });

  const addSubscription = (newSub: Subscription) => {
    setSubscriptions((prev) => {
      const updated = [newSub, ...prev];
      localStorage.setItem('subtrack-subscriptions', JSON.stringify(updated));
      return updated;
    });
  };

  const deleteSubscription = (id: string) => {
    setSubscriptions((prev) => {
      const updated = prev.filter((s) => s.id !== id);
      localStorage.setItem('subtrack-subscriptions', JSON.stringify(updated));
      return updated;
    });
  };

  const loadSampleData = () => {
    setSubscriptions(INITIAL_SUBSCRIPTIONS);
    localStorage.setItem('subtrack-subscriptions', JSON.stringify(INITIAL_SUBSCRIPTIONS));
  };

  return {
    subscriptions,
    addSubscription,
    deleteSubscription,
    loadSampleData,
  };
}

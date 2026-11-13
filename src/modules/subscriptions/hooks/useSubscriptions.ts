import { useState } from 'react';
import { Subscription } from '@/modules/subscriptions/types/subscription.types';

export function useSubscriptions() {
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

  return {
    subscriptions,
    addSubscription,
    deleteSubscription,
  };
}

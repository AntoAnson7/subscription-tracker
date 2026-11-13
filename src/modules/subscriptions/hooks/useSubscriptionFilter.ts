import { useMemo, useState } from 'react';
import { Subscription } from '@/modules/subscriptions/types/subscription.types';

export function useSubscriptionFilter(subscriptions: Subscription[]) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = useMemo(() => {
    const cats = new Set(subscriptions.map((s) => s.category));
    return ['All', ...Array.from(cats)];
  }, [subscriptions]);

  const filteredSubscriptions = useMemo(() => {
    return subscriptions.filter((sub) => {
      const matchesCategory = selectedCategory === 'All' || sub.category === selectedCategory;
      const matchesSearch =
        sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [subscriptions, selectedCategory, searchQuery]);

  return {
    selectedCategory,
    searchQuery,
    categories,
    setSelectedCategory,
    setSearchQuery,
    filteredSubscriptions,
  };
}

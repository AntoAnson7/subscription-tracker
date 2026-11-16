import { useCallback, useState } from 'react';
import { ShowcaseTab } from '@/modules/landing/types/landing.types';

export function useAppleShowcase() {
  const [activeTab, setActiveTab] = useState<ShowcaseTab>('subscriptions');

  const selectTab = useCallback((tab: ShowcaseTab) => {
    setActiveTab(tab);
  }, []);

  return {
    activeTab,
    selectTab,
  };
}

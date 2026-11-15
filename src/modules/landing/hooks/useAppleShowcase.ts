import { useCallback, useState } from 'react';
import { ShowcaseTab } from '@/modules/landing/types/landing.types';

export function useAppleShowcase() {
  const [activeTab, setActiveTab] = useState<ShowcaseTab>('overview');
  const [hikeUpdated, setHikeUpdated] = useState(false);

  const selectTab = useCallback((tab: ShowcaseTab) => {
    setActiveTab(tab);
  }, []);

  const handleApplyHike = useCallback(() => {
    setHikeUpdated(true);
  }, []);

  return {
    activeTab,
    selectTab,
    hikeUpdated,
    handleApplyHike,
  };
}

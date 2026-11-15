import { useCallback, useMemo, useState } from 'react';
import { DEMO_PREVIEW_SUBS } from '@/modules/landing/utils/landingMetrics.data';

export function useLandingPreview() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [isHikeDismissed, setIsHikeDismissed] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const toggleAnnual = useCallback(() => {
    setIsAnnual((prev) => !prev);
  }, []);

  const dismissHike = useCallback(() => {
    setIsHikeDismissed(true);
  }, []);

  const totalMonthlyRunRate = useMemo(() => {
    return DEMO_PREVIEW_SUBS.reduce((sum, sub) => sum + sub.monthlyCost, 0);
  }, []);

  const totalOptimizedMonthly = useMemo(() => {
    return DEMO_PREVIEW_SUBS.reduce((sum, sub) => sum + sub.annualOptimizedCost, 0);
  }, []);

  const annualSavings = useMemo(() => {
    return Math.round((totalMonthlyRunRate - totalOptimizedMonthly) * 12);
  }, [totalMonthlyRunRate, totalOptimizedMonthly]);

  const displayedCost = isAnnual ? totalOptimizedMonthly : totalMonthlyRunRate;

  const filteredSubs = useMemo(() => {
    if (activeCategory === 'all') return DEMO_PREVIEW_SUBS;
    return DEMO_PREVIEW_SUBS.filter((sub) => sub.category === activeCategory);
  }, [activeCategory]);

  return {
    isAnnual,
    toggleAnnual,
    isHikeDismissed,
    dismissHike,
    totalMonthlyRunRate,
    displayedCost,
    annualSavings,
    activeCategory,
    setActiveCategory,
    subscriptions: filteredSubs,
  };
}

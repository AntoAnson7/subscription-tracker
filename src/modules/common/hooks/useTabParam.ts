import { useCallback, useEffect, useState } from 'react';

export type AppTab = 'subscriptions' | 'calendar' | 'analytics';

function getInitialTab(): AppTab {
  if (typeof window === 'undefined') return 'subscriptions';
  const param = new URLSearchParams(window.location.search).get('tab');
  if (param === 'calendar' || param === 'analytics' || param === 'subscriptions') {
    return param;
  }
  return 'subscriptions';
}

export function useTabParam(): [AppTab, (tab: AppTab) => void] {
  const [activeTab, setActiveTab] = useState<AppTab>(getInitialTab);

  const handleTabChange = useCallback((newTab: AppTab) => {
    setActiveTab(newTab);
    if (typeof window === 'undefined') return;

    const url = new URL(window.location.href);
    if (newTab === 'subscriptions') {
      url.searchParams.delete('tab');
    } else {
      url.searchParams.set('tab', newTab);
    }
    window.history.replaceState(null, '', url.toString());
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setActiveTab(getInitialTab());
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return [activeTab, handleTabChange];
}

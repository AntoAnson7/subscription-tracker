import { useCallback, useEffect, useState } from 'react';

export type AppView = 'landing' | 'app';

function readUrlView(): AppView | null {
  if (typeof window === 'undefined') return null;
  const param = new URLSearchParams(window.location.search).get('view');
  if (param === 'landing' || param === 'app') return param;
  return null;
}

export function useAppView(isLoggedIn: boolean) {
  const [explicitView, setExplicitView] = useState<AppView | null>(() => readUrlView());

  const currentView: AppView = explicitView ?? (isLoggedIn ? 'app' : 'landing');

  const navigateToView = useCallback((view: AppView) => {
    setExplicitView(view);
    if (typeof window === 'undefined') return;
    const url = new URL(window.location.href);
    if (view === 'app') {
      url.searchParams.set('view', 'app');
    } else {
      url.searchParams.delete('view');
    }
    window.history.pushState(null, '', url.toString());
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setExplicitView(readUrlView());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return {
    currentView,
    navigateToView,
  };
}

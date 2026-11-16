import { useCallback, useEffect, useState } from 'react';

export type AppView = 'landing' | 'app';

export const FIRST_VISIT_KEY = 'subwise_visited';

function isFirstTimeUser(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return localStorage.getItem(FIRST_VISIT_KEY) === null;
  } catch {
    return false;
  }
}

function readUrlView(): AppView | null {
  if (typeof window === 'undefined') return null;
  const param = new URLSearchParams(window.location.search).get('view');
  if (param === 'landing' || param === 'app') return param;
  return null;
}

export function useAppView(isLoggedIn: boolean) {
  const [explicitView, setExplicitView] = useState<AppView | null>(() => {
    const urlView = readUrlView();
    if (urlView) return urlView;
    if (isFirstTimeUser()) return 'landing';
    return null;
  });

  const currentView: AppView = explicitView ?? (isLoggedIn ? 'app' : 'landing');

  const navigateToView = useCallback((view: AppView) => {
    setExplicitView(view);
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(FIRST_VISIT_KEY, 'true');
    } catch {
      // Safe fallback in sandboxed environments
    }
    const url = new URL(window.location.href);
    url.searchParams.set('view', view);
    window.history.pushState(null, '', url.toString());
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const urlView = readUrlView();
      if (urlView) {
        setExplicitView(urlView);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return {
    currentView,
    navigateToView,
  };
}

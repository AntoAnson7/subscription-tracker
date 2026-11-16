import { useEffect } from 'react';
import { isSupabaseConfigured, supabase } from '@/modules/common/utils/supabase';
import { EmailProvider } from '@/modules/sync/types/sync.types';

export function useGoogleOAuthCallback(
  linkAccount: (
    email: string,
    provider: EmailProvider,
    isSimulated?: boolean,
    accessToken?: string,
    tokenExpiresAt?: number
  ) => string | boolean | null
) {
  useEffect(() => {
    if (!supabase || !isSupabaseConfigured) return;

    const captureToken = (
      session: {
        provider_token?: string | null;
        user?: { email?: string } | null;
      } | null
    ) => {
      const isLinking = sessionStorage.getItem('subtrack_linking_gmail') === 'true';
      const hasParam = window.location.search.includes('link_gmail=true');
      if (!isLinking && !hasParam) return;

      if (session?.provider_token && session.user?.email) {
        sessionStorage.removeItem('subtrack_linking_gmail');
        if (hasParam) {
          const url = new URL(window.location.href);
          url.searchParams.delete('link_gmail');
          window.history.replaceState({}, '', url.pathname + (url.search ? url.search : ''));
        }
        linkAccount(
          session.user.email,
          'gmail',
          false,
          session.provider_token,
          Date.now() + 3600 * 1000
        );
      }
    };

    supabase.auth.getSession().then(({ data: { session } }) => {
      captureToken(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      captureToken(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [linkAccount]);
}

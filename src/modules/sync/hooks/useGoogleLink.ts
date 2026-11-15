import { useState } from 'react';
import { isSupabaseConfigured, supabase } from '@/modules/common/utils/supabase';
import {
  getGoogleClientId,
  requestGoogleAccessToken,
} from '@/modules/sync/services/googleAuth.service';

export function useGoogleLink(onSuccess: (email: string, token: string, expires: number) => void) {
  const [isAuthorizing, setIsAuthorizing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLinkGoogle = async () => {
    setIsAuthorizing(true);
    setError(null);

    const clientId = getGoogleClientId();
    if (clientId) {
      try {
        const result = await requestGoogleAccessToken(clientId);
        onSuccess(result.email, result.accessToken, result.expiresIn);
        setIsAuthorizing(false);
        return;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Google authorization failed.';
        setError(message);
        setIsAuthorizing(false);
        return;
      }
    }

    if (supabase && isSupabaseConfigured) {
      try {
        sessionStorage.setItem('subtrack_linking_gmail', 'true');
        const { error: authError } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            scopes:
              'https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/userinfo.email',
            queryParams: {
              access_type: 'offline',
              prompt: 'consent',
            },
            redirectTo: `${window.location.origin}${window.location.pathname}?link_gmail=true`,
          },
        });
        if (authError) throw authError;
      } catch (err) {
        sessionStorage.removeItem('subtrack_linking_gmail');
        const message = err instanceof Error ? err.message : 'Failed to initialize Google login.';
        setError(message);
        setIsAuthorizing(false);
      }
      return;
    }

    setError('Google authentication service is not configured. Please contact the administrator.');
    setIsAuthorizing(false);
  };

  return {
    isAuthorizing,
    error,
    handleLinkGoogle,
    clearError: () => setError(null),
  };
}

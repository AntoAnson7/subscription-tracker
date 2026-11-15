import { useState } from 'react';
import {
  getGoogleClientId,
  requestGoogleAccessToken,
  saveGoogleClientId,
} from '@/modules/sync/services/googleAuth.service';

export function useGoogleLink(onSuccess: (email: string, token: string, expires: number) => void) {
  const [clientId, setClientId] = useState<string>(() => getGoogleClientId());
  const [isAuthorizing, setIsAuthorizing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showConfig, setShowConfig] = useState<boolean>(() => !getGoogleClientId());

  const handleUpdateClientId = (id: string) => {
    setClientId(id);
    saveGoogleClientId(id);
    if (id.trim()) setError(null);
  };

  const handleLinkGoogle = async () => {
    const trimmedId = clientId.trim();
    if (!trimmedId) {
      setError('Please provide a Google Cloud OAuth Client ID to connect Gmail.');
      setShowConfig(true);
      return;
    }

    setIsAuthorizing(true);
    setError(null);

    try {
      const result = await requestGoogleAccessToken(trimmedId);
      onSuccess(result.email, result.accessToken, result.expiresIn);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Google authorization failed.';
      setError(message);
    } finally {
      setIsAuthorizing(false);
    }
  };

  return {
    clientId,
    isAuthorizing,
    error,
    showConfig,
    setShowConfig,
    updateClientId: handleUpdateClientId,
    handleLinkGoogle,
    clearError: () => setError(null),
  };
}

import {
  GoogleTokenClient,
  GoogleTokenResponse,
  GoogleUserInfo,
} from '@/modules/sync/types/google.types';

const CLIENT_ID_STORAGE_KEY = 'subtrack-google-client-id';

export function getGoogleClientId(): string {
  const envId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined;
  if (envId && envId.trim().length > 0) return envId.trim();

  if (typeof window !== 'undefined') {
    return localStorage.getItem(CLIENT_ID_STORAGE_KEY)?.trim() || '';
  }
  return '';
}

export function saveGoogleClientId(clientId: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(CLIENT_ID_STORAGE_KEY, clientId.trim());
  }
}

interface GoogleAuthResult {
  email: string;
  accessToken: string;
  expiresIn: number;
  name?: string;
}

export async function requestGoogleAccessToken(clientId: string): Promise<GoogleAuthResult> {
  const win = window as unknown as {
    google?: {
      accounts?: {
        oauth2?: {
          initTokenClient: (config: {
            client_id: string;
            scope: string;
            prompt?: string;
            callback: (resp: GoogleTokenResponse) => void;
            error_callback?: (err: unknown) => void;
          }) => GoogleTokenClient;
        };
      };
    };
  };

  const oauth2 = win.google?.accounts?.oauth2;
  if (!oauth2) {
    throw new Error(
      'Google Identity Services script not loaded. Please check your internet connection.'
    );
  }

  return new Promise((resolve, reject) => {
    try {
      const tokenClient = oauth2.initTokenClient({
        client_id: clientId,
        scope:
          'https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
        prompt: 'consent',
        callback: async (resp: GoogleTokenResponse) => {
          if (resp.error) {
            reject(
              new Error(resp.error_description || resp.error || 'Google authorization failed')
            );
            return;
          }

          try {
            const profileRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
              headers: { Authorization: `Bearer ${resp.access_token}` },
            });

            if (!profileRes.ok) {
              throw new Error('Failed to retrieve Google profile information.');
            }

            const profile = (await profileRes.json()) as GoogleUserInfo;
            resolve({
              email: profile.email,
              accessToken: resp.access_token,
              expiresIn: resp.expires_in,
              name: profile.name,
            });
          } catch (profileErr) {
            reject(profileErr);
          }
        },
        error_callback: (err: unknown) => {
          reject(new Error(typeof err === 'string' ? err : 'Google popup was closed or blocked.'));
        },
      });

      tokenClient.requestAccessToken();
    } catch (initErr) {
      reject(initErr);
    }
  });
}

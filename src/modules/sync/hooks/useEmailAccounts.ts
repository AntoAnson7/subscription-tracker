import { useState } from 'react';
import { EmailProvider, LinkedEmailAccount } from '@/modules/sync/types/sync.types';

const STORAGE_KEY = 'subtrack-linked-emails';

function loadAccounts(userId: string | null): LinkedEmailAccount[] {
  if (typeof window === 'undefined') return [];
  const key = userId ? `${STORAGE_KEY}-${userId}` : STORAGE_KEY;
  const raw = localStorage.getItem(key);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as LinkedEmailAccount[];
    const cleaned = parsed.filter((a) => a.email !== 'alex.tech@gmail.com');
    if (cleaned.length !== parsed.length) {
      localStorage.setItem(key, JSON.stringify(cleaned));
    }
    return cleaned;
  } catch {
    return [];
  }
}

function saveAccounts(userId: string | null, accounts: LinkedEmailAccount[]) {
  const key = userId ? `${STORAGE_KEY}-${userId}` : STORAGE_KEY;
  localStorage.setItem(key, JSON.stringify(accounts));
}

export function useEmailAccounts(userId: string | null = null) {
  const [accounts, setAccounts] = useState<LinkedEmailAccount[]>(() => loadAccounts(userId));
  const [prevUserId, setPrevUserId] = useState(userId);

  if (prevUserId !== userId) {
    setPrevUserId(userId);
    setAccounts(loadAccounts(userId));
  }

  const linkAccount = (
    email: string,
    provider: EmailProvider = 'gmail',
    isSimulated = false,
    accessToken?: string,
    tokenExpiresAt?: number
  ): string | null => {
    const existing = accounts.find((a) => a.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      if (accessToken) {
        setAccounts((prev) => {
          const updated = prev.map((a) =>
            a.id === existing.id
              ? { ...a, accessToken, tokenExpiresAt, isSimulated, status: 'active' as const }
              : a
          );
          saveAccounts(userId, updated);
          return updated;
        });
      }
      return existing.id;
    }

    const newId = crypto.randomUUID();
    const newAccount: LinkedEmailAccount = {
      id: newId,
      userId,
      email,
      provider,
      linkedAt: new Date().toISOString(),
      lastSyncedAt: null,
      status: 'active',
      isSimulated,
      accessToken,
      tokenExpiresAt,
      grantedPermissions: ['gmail.readonly', 'userinfo.email'],
    };

    setAccounts((prev) => {
      const updated = [...prev, newAccount];
      saveAccounts(userId, updated);
      return updated;
    });
    return newId;
  };

  const unlinkAccount = (id: string) => {
    setAccounts((prev) => {
      const updated = prev.filter((a) => a.id !== id);
      saveAccounts(userId, updated);
      return updated;
    });
  };

  const updateAccountSync = (id: string, status: 'active' | 'syncing' | 'error') => {
    setAccounts((prev) => {
      const updated = prev.map((a) =>
        a.id === id
          ? {
              ...a,
              status,
              lastSyncedAt: status === 'active' ? new Date().toISOString() : a.lastSyncedAt,
            }
          : a
      );
      saveAccounts(userId, updated);
      return updated;
    });
  };

  return {
    accounts,
    hasLinkedAccounts: accounts.length > 0,
    linkAccount,
    unlinkAccount,
    updateAccountSync,
  };
}

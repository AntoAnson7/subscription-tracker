import { useState } from 'react';
import { EmailProvider, LinkedEmailAccount } from '@/modules/sync/types/sync.types';

const STORAGE_KEY = 'subtrack-linked-emails';

function loadAccounts(userId: string | null): LinkedEmailAccount[] {
  if (typeof window === 'undefined') return [];
  const key = userId ? `${STORAGE_KEY}-${userId}` : STORAGE_KEY;
  const raw = localStorage.getItem(key);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as LinkedEmailAccount[];
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
    isSimulated = true
  ): boolean => {
    const existing = accounts.find((a) => a.email.toLowerCase() === email.toLowerCase());
    if (existing) return false;

    const newAccount: LinkedEmailAccount = {
      id: crypto.randomUUID(),
      userId,
      email,
      provider,
      linkedAt: new Date().toISOString(),
      lastSyncedAt: null,
      status: 'active',
      isSimulated,
      grantedPermissions: ['receipts.read', 'invoices.read', 'debits.read'],
    };

    setAccounts((prev) => {
      const updated = [...prev, newAccount];
      saveAccounts(userId, updated);
      return updated;
    });
    return true;
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

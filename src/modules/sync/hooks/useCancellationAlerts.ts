import { useCallback, useState } from 'react';
import { CancellationAlert } from '@/modules/sync/types/sync.types';

const STORAGE_KEY = 'subwise-cancellation-alerts';
const LEGACY_STORAGE_KEY = 'subtrack-cancellation-alerts';

function loadAlerts(): CancellationAlert[] {
  if (typeof window === 'undefined') return [];
  const raw = localStorage.getItem(STORAGE_KEY) ?? localStorage.getItem(LEGACY_STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as CancellationAlert[];
  } catch {
    return [];
  }
}

function saveAlerts(alerts: CancellationAlert[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(alerts));
}

export function useCancellationAlerts(onConfirmCancel: (subId: string) => Promise<void> | void) {
  const [alerts, setAlerts] = useState<CancellationAlert[]>(() => loadAlerts());

  const addAlert = useCallback((alert: CancellationAlert) => {
    setAlerts((prev) => {
      if (prev.some((a) => a.subscriptionId === alert.subscriptionId && a.status === 'pending')) {
        return prev;
      }
      const updated = [alert, ...prev];
      saveAlerts(updated);
      return updated;
    });
  }, []);

  const confirmAlert = useCallback(
    async (alertId: string) => {
      const alert = alerts.find((a) => a.id === alertId);
      if (alert) {
        await onConfirmCancel(alert.subscriptionId);
        setAlerts((prev) => {
          const updated = prev.map((a) =>
            a.id === alertId ? { ...a, status: 'confirmed' as const } : a
          );
          saveAlerts(updated);
          return updated;
        });
      }
    },
    [alerts, onConfirmCancel]
  );

  const dismissAlert = useCallback((alertId: string) => {
    setAlerts((prev) => {
      const updated = prev.map((a) =>
        a.id === alertId ? { ...a, status: 'dismissed' as const } : a
      );
      saveAlerts(updated);
      return updated;
    });
  }, []);

  const pendingAlerts = alerts.filter((a) => a.status === 'pending');

  return {
    alerts,
    pendingAlerts,
    addAlert,
    confirmAlert,
    dismissAlert,
  };
}

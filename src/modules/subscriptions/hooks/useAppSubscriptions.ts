import { useState } from 'react';
import { useRunRateMetrics } from '@/modules/dashboard/hooks/useRunRateMetrics';
import { useSubscriptionFilter } from '@/modules/subscriptions/hooks/useSubscriptionFilter';
import { useSubscriptions } from '@/modules/subscriptions/hooks/useSubscriptions';
import { SubscriptionFormData } from '@/modules/subscriptions/types/form.types';
import { Subscription } from '@/modules/subscriptions/types/subscription.types';

export function useAppSubscriptions(userId: string | null = null) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSub, setActiveSub] = useState<Subscription | null>(null);

  const {
    subscriptions,
    loading: subsLoading,
    addSubscription,
    updateSubscription,
    deleteSubscription,
  } = useSubscriptions(userId);

  const metrics = useRunRateMetrics(subscriptions);
  const filter = useSubscriptionFilter(subscriptions);

  const expiringTrial =
    subscriptions.find((sub) => sub.status === 'trial' && sub.daysRemaining <= 7) ?? null;

  const handleOpenAdd = () => {
    setActiveSub(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (sub: Subscription) => {
    setActiveSub(sub);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setActiveSub(null);
  };

  const handleModalSubmit = async (data: SubscriptionFormData) => {
    const isFamily = Boolean(data.isFamily && (data.splitCount ?? 1) > 1);
    const splitCount = isFamily ? Math.max(2, data.splitCount || 2) : 1;
    const totalCost = isFamily ? data.cost : undefined;
    const trackedCost = isFamily ? Math.round((data.cost / splitCount) * 100) / 100 : data.cost;

    const payload = {
      ...data,
      cost: trackedCost,
      totalCost,
      isFamily,
      splitCount: isFamily ? splitCount : undefined,
    };

    if (activeSub) {
      await updateSubscription(activeSub.id, payload);
    } else {
      await addSubscription(payload);
    }
  };

  const cancelSubscription = async (id: string) => {
    const sub = subscriptions.find((s) => s.id === id);
    if (!sub) return;
    const { id: _id, daysRemaining: _d, monthlyEquivalent: _m, ...rest } = sub;
    await updateSubscription(id, { ...rest, status: 'cancelled' });
  };

  const handleOpenRenew = (sub: Subscription) => {
    setActiveSub({ ...sub, status: 'active' });
    setIsModalOpen(true);
  };

  return {
    isModalOpen,
    activeSub,
    subsLoading,
    metrics,
    filter,
    expiringTrial,
    handleOpenAdd,
    handleOpenEdit,
    handleOpenRenew,
    cancelSubscription,
    handleCloseModal,
    handleModalSubmit,
    deleteSubscription,
    subscriptions,
    subscriptionsCount: subscriptions.length,
  };
}

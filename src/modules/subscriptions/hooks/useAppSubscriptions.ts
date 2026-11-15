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
    if (activeSub) {
      await updateSubscription(activeSub.id, data);
    } else {
      await addSubscription(data);
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

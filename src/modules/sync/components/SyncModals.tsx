import { Subscription } from '@/modules/subscriptions/types/subscription.types';
import { DiscoveredSubsModal } from '@/modules/sync/components/DiscoveredSubsModal';
import { LinkEmailConsentModal } from '@/modules/sync/components/LinkEmailConsentModal';
import { PaymentHistoryDrawer } from '@/modules/sync/components/PaymentHistoryDrawer';
import {
  DiscoveredSubscription,
  EmailProvider,
  PaymentRecord,
} from '@/modules/sync/types/sync.types';

interface SyncModalsProps {
  isConsentOpen: boolean;
  onCloseConsent: () => void;
  onLinkAccount: (
    email: string,
    provider: EmailProvider,
    isSimulated?: boolean,
    accessToken?: string,
    tokenExpiresAt?: number
  ) => boolean;
  isReviewOpen: boolean;
  onCloseReview: () => void;
  discoveredSubs: DiscoveredSubscription[];
  onToggleSelection: (id: string) => void;
  onConfirmDiscovered: (selected: DiscoveredSubscription[]) => Promise<void> | void;
  activeSubForPayments: Subscription | null;
  onClosePayments: () => void;
  getPaymentsForSub: (subId: string) => PaymentRecord[];
}

export function SyncModals({
  isConsentOpen,
  onCloseConsent,
  onLinkAccount,
  isReviewOpen,
  onCloseReview,
  discoveredSubs,
  onToggleSelection,
  onConfirmDiscovered,
  activeSubForPayments,
  onClosePayments,
  getPaymentsForSub,
}: SyncModalsProps) {
  return (
    <>
      <LinkEmailConsentModal
        isOpen={isConsentOpen}
        onClose={onCloseConsent}
        onLink={onLinkAccount}
      />

      <DiscoveredSubsModal
        isOpen={isReviewOpen}
        onClose={onCloseReview}
        discoveredSubs={discoveredSubs}
        onToggle={onToggleSelection}
        onConfirm={onConfirmDiscovered}
      />

      <PaymentHistoryDrawer
        isOpen={Boolean(activeSubForPayments)}
        onClose={onClosePayments}
        subscriptionName={activeSubForPayments?.name ?? ''}
        payments={activeSubForPayments ? getPaymentsForSub(activeSubForPayments.id) : []}
      />
    </>
  );
}

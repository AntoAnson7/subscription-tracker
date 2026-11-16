import { Subscription } from '@/modules/subscriptions/types/subscription.types';
import { DiscoveredSubsModal } from '@/modules/sync/components/DiscoveredSubsModal';
import { LinkEmailConsentModal } from '@/modules/sync/components/LinkEmailConsentModal';
import { PaymentHistoryDrawer } from '@/modules/sync/components/PaymentHistoryDrawer';
import { ScanPromptModal } from '@/modules/sync/components/ScanPromptModal';
import {
  DiscoveredSubscription,
  EmailProvider,
  PaymentRecord,
  ScanResult,
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
  ) => string | boolean | null;
  promptScanAccount: { id: string; email: string } | null;
  onCloseScanPrompt: () => void;
  onScanAccount: (id: string) => Promise<ScanResult | void>;
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
  promptScanAccount,
  onCloseScanPrompt,
  onScanAccount,
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

      <ScanPromptModal
        isOpen={Boolean(promptScanAccount)}
        account={promptScanAccount}
        onScan={onScanAccount}
        onClose={onCloseScanPrompt}
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

import { User } from '@supabase/supabase-js';
import { AuthModals } from '@/modules/auth/components/AuthModals';
import { CreateProfileData, UserProfile } from '@/modules/auth/types/auth.types';
import { SubscriptionModal } from '@/modules/subscriptions/components/SubscriptionModal';
import { SubscriptionFormData } from '@/modules/subscriptions/types/form.types';
import { Subscription } from '@/modules/subscriptions/types/subscription.types';
import { SyncModals } from '@/modules/sync/components/SyncModals';
import { useSyncManager } from '@/modules/sync/hooks/useSyncManager';

interface AppModalsProps {
  isSubModalOpen: boolean;
  onCloseSubModal: () => void;
  onSubmitSubModal: (data: SubscriptionFormData) => Promise<void> | void;
  onDeleteSub: (id: string) => Promise<void> | void;
  activeSub: Subscription | null;
  isAuthOpen: boolean;
  onCloseAuth: () => void;
  onGoogleSignIn: () => Promise<void>;
  authError: string | null;
  needsOnboarding: boolean;
  user: User | null;
  onCreateProfile: (data: CreateProfileData) => Promise<boolean>;
  isProfileOpen: boolean;
  onCloseProfile: () => void;
  profile: UserProfile | null;
  onSignOut: () => Promise<void>;
  syncManager: ReturnType<typeof useSyncManager>;
}

export function AppModals({
  isSubModalOpen,
  onCloseSubModal,
  onSubmitSubModal,
  onDeleteSub,
  activeSub,
  isAuthOpen,
  onCloseAuth,
  onGoogleSignIn,
  authError,
  needsOnboarding,
  user,
  onCreateProfile,
  isProfileOpen,
  onCloseProfile,
  profile,
  onSignOut,
  syncManager,
}: AppModalsProps) {
  return (
    <>
      <SubscriptionModal
        isOpen={isSubModalOpen}
        onClose={onCloseSubModal}
        onSubmit={onSubmitSubModal}
        onDelete={onDeleteSub}
        initialSubscription={activeSub}
      />

      <AuthModals
        isAuthOpen={isAuthOpen}
        onCloseAuth={onCloseAuth}
        onGoogleSignIn={onGoogleSignIn}
        authError={authError}
        needsOnboarding={needsOnboarding}
        user={user}
        onCreateProfile={onCreateProfile}
        isProfileOpen={isProfileOpen}
        onCloseProfile={onCloseProfile}
        profile={profile}
        onSignOut={onSignOut}
        linkedAccounts={syncManager.linkedAccounts}
        isSyncing={syncManager.isSyncing}
        onOpenLinkModal={() => syncManager.setIsConsentModalOpen(true)}
        onScanEmails={syncManager.scanEmails}
        onUnlinkAccount={syncManager.unlinkAccount}
      />

      <SyncModals
        isConsentOpen={syncManager.isConsentModalOpen}
        onCloseConsent={() => syncManager.setIsConsentModalOpen(false)}
        onLinkAccount={syncManager.linkAccount}
        isReviewOpen={syncManager.isReviewOpen}
        onCloseReview={syncManager.closeReview}
        discoveredSubs={syncManager.discoveredSubs}
        onToggleSelection={syncManager.toggleSelection}
        onConfirmDiscovered={syncManager.confirmDiscoveredSubs}
        activeSubForPayments={syncManager.activeSubForPayments}
        onClosePayments={() => syncManager.setActiveSubForPayments(null)}
        getPaymentsForSub={syncManager.getPaymentsForSubscription}
      />
    </>
  );
}

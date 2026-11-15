import { useRef } from 'react';
import { CheckCircle2, LogOut, X } from 'lucide-react';
import { User } from '@supabase/supabase-js';
import { profileModalStyles } from '@/modules/auth/recipes/profileModal.recipe';
import { UserProfile } from '@/modules/auth/types/auth.types';
import { useClickOutside } from '@/modules/common/hooks/useClickOutside';
import { useFocusTrap } from '@/modules/common/hooks/useFocusTrap';
import { useLockBodyScroll } from '@/modules/common/hooks/useLockBodyScroll';
import { LinkedAccountsSection } from '@/modules/sync/components/LinkedAccountsSection';
import { LinkedEmailAccount } from '@/modules/sync/types/sync.types';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  profile: UserProfile | null;
  onSignOut: () => void;
  linkedAccounts?: LinkedEmailAccount[];
  isSyncing?: boolean;
  onOpenLinkModal?: () => void;
  onScanEmails?: (id: string) => void;
  onUnlinkAccount?: (id: string) => void;
}

export function ProfileModal({
  isOpen,
  onClose,
  user,
  profile,
  onSignOut,
  linkedAccounts = [],
  isSyncing = false,
  onOpenLinkModal = () => {},
  onScanEmails = () => {},
  onUnlinkAccount = () => {},
}: ProfileModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const classes = profileModalStyles();

  useClickOutside(modalRef, onClose, isOpen);
  useFocusTrap(modalRef, isOpen, { onEscape: onClose });
  useLockBodyScroll(isOpen);

  if (!isOpen) return null;

  const avatarUrl =
    profile?.avatarUrl ??
    (user?.user_metadata?.avatar_url as string | undefined) ??
    (user?.user_metadata?.picture as string | undefined);

  const displayName =
    profile?.fullName ||
    (user?.user_metadata?.full_name as string | undefined) ||
    user?.email?.split('@')[0] ||
    'Guest User';

  const userInitial = displayName.slice(0, 2).toUpperCase();

  const handleSignOut = () => {
    onClose();
    onSignOut();
  };

  return (
    <div
      className={`${classes.backdrop} backdrop-animated`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="profile-name"
    >
      <div ref={modalRef} className={`${classes.modal} modal-animated`}>
        <button
          type="button"
          onClick={onClose}
          className={classes.closeBtn}
          aria-label="Close profile"
        >
          <X size={16} />
        </button>

        <header className={classes.header}>
          <div className={classes.avatarWrapper}>
            {avatarUrl ? (
              <img src={avatarUrl} alt={displayName} className={classes.avatarImg} />
            ) : (
              <span className={classes.avatarFallback}>{userInitial}</span>
            )}
          </div>
          <h2 id="profile-name" className={classes.name}>
            {displayName}
          </h2>
          <div className={classes.emailBadge}>
            <CheckCircle2 size={13} color="#10B981" />
            <span>{user?.email ?? 'Local guest'}</span>
          </div>
        </header>

        <div className={classes.infoGrid}>
          <div className={classes.infoCard}>
            <span className={classes.infoLabel}>Currency</span>
            <span className={classes.infoValue}>{profile?.preferredCurrency ?? 'INR (₹)'}</span>
          </div>
          <div className={classes.infoCard}>
            <span className={classes.infoLabel}>Tracking focus</span>
            <span className={classes.infoValue}>{profile?.trackingFocus ?? 'Personal'}</span>
          </div>
          <div className={classes.infoCard}>
            <span className={classes.infoLabel}>Account status</span>
            <span className={classes.infoValue}>Active</span>
          </div>
          <div className={classes.infoCard}>
            <span className={classes.infoLabel}>Member since</span>
            <span className={classes.infoValue}>
              {user?.created_at
                ? new Date(user.created_at).toLocaleDateString('en-US', {
                    month: 'short',
                    year: 'numeric',
                  })
                : 'Recently'}
            </span>
          </div>
        </div>

        <LinkedAccountsSection
          accounts={linkedAccounts}
          isSyncing={isSyncing}
          onOpenLinkModal={onOpenLinkModal}
          onScan={onScanEmails}
          onUnlink={onUnlinkAccount}
        />

        {user && (
          <div className={classes.signOutSection}>
            <button type="button" onClick={handleSignOut} className={classes.signOutBtn}>
              <LogOut size={16} />
              <span>Sign out</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

import { useRef } from 'react';
import { CheckCircle2, LogOut, X } from 'lucide-react';
import { User } from '@supabase/supabase-js';
import { profileModalStyles } from '@/modules/auth/recipes/profileModal.recipe';
import { UserProfile } from '@/modules/auth/types/auth.types';
import { useClickOutside } from '@/modules/common/hooks/useClickOutside';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  profile: UserProfile | null;
  onSignOut: () => void;
}

export function ProfileModal({ isOpen, onClose, user, profile, onSignOut }: ProfileModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const classes = profileModalStyles();

  useClickOutside(modalRef, onClose, isOpen);

  if (!isOpen || !user) return null;

  const avatarUrl =
    profile?.avatarUrl ??
    (user.user_metadata?.avatar_url as string | undefined) ??
    (user.user_metadata?.picture as string | undefined);

  const displayName =
    profile?.fullName ||
    (user.user_metadata?.full_name as string | undefined) ||
    user.email?.split('@')[0] ||
    'User';

  const userInitial = displayName.slice(0, 2).toUpperCase();

  const handleSignOut = () => {
    onClose();
    onSignOut();
  };

  return (
    <div
      className={classes.backdrop}
      role="dialog"
      aria-modal="true"
      aria-labelledby="profile-name"
    >
      <div ref={modalRef} className={classes.modal}>
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
            <span>{user.email}</span>
          </div>
        </header>

        <div className={classes.infoGrid}>
          <div className={classes.infoCard}>
            <span className={classes.infoLabel}>Currency</span>
            <span className={classes.infoValue}>{profile?.preferredCurrency ?? 'USD ($)'}</span>
          </div>

          <div className={classes.infoCard}>
            <span className={classes.infoLabel}>Tracking Focus</span>
            <span className={classes.infoValue}>{profile?.trackingFocus ?? 'Personal'}</span>
          </div>
        </div>

        <button type="button" onClick={handleSignOut} className={classes.signOutBtn}>
          <LogOut size={16} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}

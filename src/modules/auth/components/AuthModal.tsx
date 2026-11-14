import { useRef } from 'react';
import { Sparkles, X } from 'lucide-react';
import { GoogleIcon } from '@/modules/auth/components/GoogleIcon';
import { authModalStyles } from '@/modules/auth/recipes/authModal.recipe';
import { useClickOutside } from '@/modules/common/hooks/useClickOutside';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoogleSignIn: () => Promise<void> | void;
  error: string | null;
}

export function AuthModal({ isOpen, onClose, onGoogleSignIn, error }: AuthModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const classes = authModalStyles();

  useClickOutside(modalRef, onClose, isOpen);

  if (!isOpen) return null;

  return (
    <div
      className={`${classes.backdrop} backdrop-animated`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      <div ref={modalRef} className={`${classes.modal} modal-animated`}>
        <button type="button" onClick={onClose} className={classes.closeBtn} aria-label="Close">
          <X size={16} />
        </button>

        <header className={classes.header}>
          <div className={classes.iconWrapper}>
            <Sparkles size={22} strokeWidth={2.2} />
          </div>
          <h2 id="auth-modal-title" className={classes.title}>
            SubTrack Sync
          </h2>
          <p className={classes.subtitle}>
            Sign in with Google to securely sync your subscriptions, renewals, and run-rates.
          </p>
        </header>

        {error && <div className={classes.errorText}>{error}</div>}

        <button type="button" onClick={onGoogleSignIn} className={classes.googleBtn}>
          <GoogleIcon size={18} />
          <span className={classes.googleText}>Continue with Google</span>
        </button>

        <p className={classes.termsText}>
          By continuing, you agree to SubTrack's privacy policy and local sync terms.
        </p>
      </div>
    </div>
  );
}

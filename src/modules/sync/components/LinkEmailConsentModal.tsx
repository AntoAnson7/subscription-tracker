import { useRef, useState } from 'react';
import { Check, Mail, ShieldCheck, X } from 'lucide-react';
import { GoogleIcon } from '@/modules/auth/components/GoogleIcon';
import { Checkbox } from '@/modules/common/components/Checkbox';
import { useClickOutside } from '@/modules/common/hooks/useClickOutside';
import { useFocusTrap } from '@/modules/common/hooks/useFocusTrap';
import { useLockBodyScroll } from '@/modules/common/hooks/useLockBodyScroll';
import { useGoogleLink } from '@/modules/sync/hooks/useGoogleLink';
import { consentFormStyles } from '@/modules/sync/recipes/consentForm.recipe';
import { consentModalStyles } from '@/modules/sync/recipes/consentModal.recipe';
import { EmailProvider } from '@/modules/sync/types/sync.types';

interface LinkEmailConsentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLink: (
    email: string,
    provider: EmailProvider,
    isSimulated?: boolean,
    accessToken?: string,
    tokenExpiresAt?: number
  ) => boolean;
}

export function LinkEmailConsentModal({ isOpen, onClose, onLink }: LinkEmailConsentModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const classes = consentModalStyles();
  const formClasses = consentFormStyles();
  const [hasConsented, setHasConsented] = useState(false);
  const [consentError, setConsentError] = useState<string | null>(null);

  const googleAuth = useGoogleLink((email, token, expires) => {
    onLink(email, 'gmail', false, token, Date.now() + expires * 1000);
    onClose();
  });

  useClickOutside(modalRef, onClose, isOpen);
  useFocusTrap(modalRef, isOpen, { onEscape: onClose });
  useLockBodyScroll(isOpen);

  if (!isOpen) return null;

  const handleConnectClick = () => {
    if (!hasConsented) {
      setConsentError('Please authorize email scanning before connecting.');
      return;
    }
    setConsentError(null);
    googleAuth.handleLinkGoogle();
  };

  const activeError = consentError || googleAuth.error;

  return (
    <div
      className={classes.backdrop}
      role="dialog"
      aria-modal="true"
      aria-labelledby="consent-title"
    >
      <div ref={modalRef} className={classes.modal}>
        <button
          type="button"
          onClick={onClose}
          className={classes.closeBtn}
          aria-label="Close modal"
        >
          <X size={16} />
        </button>

        <header className={classes.header}>
          <h2 id="consent-title" className={classes.title}>
            Link Gmail account
          </h2>
          <p className={classes.subtitle}>Auto-detect subscriptions, renewals, and debit alerts.</p>
        </header>

        <div className={classes.form}>
          <div className={classes.body}>
            <div className={formClasses.privacyBox}>
              <div>
                <ShieldCheck size={16} />
                <span>
                  <strong>Read-only:</strong> Only transactional receipts and debits are processed.
                </span>
              </div>
              <div>
                <Mail size={16} />
                <span>
                  <strong>Targeted search:</strong> Private personal emails are never accessed.
                </span>
              </div>
              <div>
                <Check size={16} />
                <span>
                  <strong>Zero storage:</strong> Email bodies are never saved. You review every
                  item.
                </span>
              </div>
            </div>

            <div className={formClasses.consentRow}>
              <Checkbox
                id="consent-checkbox"
                checked={hasConsented}
                onChange={(checked) => {
                  setHasConsented(checked);
                  if (checked) setConsentError(null);
                }}
                label="I authorize SubTrack to scan transactional emails. I can unlink anytime."
              />
            </div>

            {activeError && (
              <p
                style={{
                  color: 'var(--colors-status-danger)',
                  fontSize: '12px',
                  marginBottom: '12px',
                }}
              >
                {activeError}
              </p>
            )}
          </div>

          <div className={classes.actionsRow}>
            <button type="button" onClick={onClose} className={classes.cancelBtn}>
              Cancel
            </button>
            <button
              type="button"
              disabled={!hasConsented || googleAuth.isAuthorizing}
              onClick={handleConnectClick}
              className={classes.submitBtn}
            >
              <GoogleIcon size={16} />
              <span>{googleAuth.isAuthorizing ? 'Connecting...' : 'Continue with Google'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

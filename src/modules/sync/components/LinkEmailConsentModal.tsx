import { useRef, useState } from 'react';
import { Check, Mail, ShieldCheck, X } from 'lucide-react';
import { Checkbox } from '@/modules/common/components/Checkbox';
import { useClickOutside } from '@/modules/common/hooks/useClickOutside';
import { useFocusTrap } from '@/modules/common/hooks/useFocusTrap';
import { useLockBodyScroll } from '@/modules/common/hooks/useLockBodyScroll';
import { consentFormStyles } from '@/modules/sync/recipes/consentForm.recipe';
import { consentModalStyles } from '@/modules/sync/recipes/consentModal.recipe';
import { EmailProvider } from '@/modules/sync/types/sync.types';

interface LinkEmailConsentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLink: (email: string, provider: EmailProvider, isSimulated?: boolean) => boolean;
}

export function LinkEmailConsentModal({ isOpen, onClose, onLink }: LinkEmailConsentModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const classes = consentModalStyles();
  const formClasses = consentFormStyles();
  const [email, setEmail] = useState('alex.tech@gmail.com');
  const [provider] = useState<EmailProvider>('gmail');
  const [hasConsented, setHasConsented] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useClickOutside(modalRef, onClose, isOpen);
  useFocusTrap(modalRef, isOpen, { onEscape: onClose });
  useLockBodyScroll(isOpen);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!hasConsented) {
      setError('You must authorize receipt scanning to link this email.');
      return;
    }
    if (!onLink(email.trim(), provider, true)) {
      setError('This email is already linked.');
      return;
    }
    setError(null);
    onClose();
  };

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
            Link email account
          </h2>
          <p className={classes.subtitle}>Auto-detect subscriptions, renewals, and debit alerts.</p>
        </header>

        <form onSubmit={handleSubmit} className={classes.form}>
          <div className={classes.body}>
            <div className={formClasses.inputGroup}>
              <label htmlFor="email-input">Email address</label>
              <input
                id="email-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. alex@gmail.com"
                className={formClasses.textInput}
                required
              />
            </div>

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
                onChange={setHasConsented}
                label="I authorize SubTrack to scan transactional emails. I can unlink anytime."
              />
            </div>

            {error && (
              <p
                style={{
                  color: 'var(--colors-status-danger)',
                  fontSize: '12px',
                  marginBottom: '12px',
                }}
              >
                {error}
              </p>
            )}
          </div>

          <div className={classes.actionsRow}>
            <button type="button" onClick={onClose} className={classes.cancelBtn}>
              Cancel
            </button>
            <button type="submit" disabled={!hasConsented || !email} className={classes.submitBtn}>
              Authorize & link
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

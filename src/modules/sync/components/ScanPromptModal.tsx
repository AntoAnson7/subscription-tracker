import { useRef, useState } from 'react';
import { CheckCircle2, Mail, RefreshCw, Sparkles, X } from 'lucide-react';
import { useClickOutside } from '@/modules/common/hooks/useClickOutside';
import { useFocusTrap } from '@/modules/common/hooks/useFocusTrap';
import { useLockBodyScroll } from '@/modules/common/hooks/useLockBodyScroll';
import { scanPromptModalStyles } from '@/modules/sync/recipes/scanPromptModal.recipe';
import { ScanResult } from '@/modules/sync/types/sync.types';

interface ScanPromptModalProps {
  isOpen: boolean;
  account: { id: string; email: string } | null;
  onScan: (id: string) => Promise<ScanResult | void>;
  onClose: () => void;
}

export function ScanPromptModal({ isOpen, account, onScan, onClose }: ScanPromptModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const classes = scanPromptModalStyles();
  const [isScanning, setIsScanning] = useState(false);
  const [status, setStatus] = useState<'prompt' | 'empty' | 'error'>('prompt');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useClickOutside(modalRef, isScanning ? () => {} : onClose, isOpen);
  useFocusTrap(modalRef, isOpen, { onEscape: isScanning ? undefined : onClose });
  useLockBodyScroll(isOpen);

  if (!isOpen || !account) return null;

  const handleStartScan = async () => {
    setIsScanning(true);
    setStatus('prompt');
    try {
      const res = await onScan(account.id);
      setIsScanning(false);
      if (res && res.discoveredCount > 0) {
        onClose();
        return;
      }
      if (res?.error) {
        setStatus('error');
        setErrorMsg(
          res.error === 'SCOPE_ERROR'
            ? 'Gmail permission was missing. Please reconnect and check the permission box.'
            : 'Authentication failed. Please try reconnecting.'
        );
        return;
      }
      setStatus('empty');
    } catch {
      setIsScanning(false);
      setStatus('error');
      setErrorMsg('Unable to scan inbox at this time.');
    }
  };

  const handleClose = () => {
    setStatus('prompt');
    setErrorMsg(null);
    setIsScanning(false);
    onClose();
  };

  return (
    <div className={classes.backdrop} role="dialog" aria-modal="true" aria-labelledby="scan-title">
      <div ref={modalRef} className={classes.modal}>
        {!isScanning && (
          <button
            type="button"
            onClick={handleClose}
            className={classes.closeBtn}
            aria-label="Close"
          >
            <X size={16} />
          </button>
        )}
        <header className={classes.header}>
          <div className={classes.iconWrapper}>
            {status === 'empty' ? (
              <CheckCircle2 size={28} color="#10B981" />
            ) : isScanning ? (
              <RefreshCw size={28} className="spin" />
            ) : (
              <Sparkles size={28} />
            )}
          </div>
          <h2 id="scan-title" className={classes.title}>
            {status === 'empty'
              ? 'Scan complete'
              : status === 'error'
                ? 'Scan error'
                : isScanning
                  ? 'Scanning inbox...'
                  : 'Scan inbox for subscriptions?'}
          </h2>
          <div className={classes.emailBadge}>
            <Mail size={12} />
            <span>{account.email}</span>
          </div>
        </header>

        <div className={classes.body}>
          {isScanning ? (
            <div className={classes.scanningBox}>
              <p className={classes.scanningText}>Analyzing recent emails and invoices...</p>
              <p className={classes.description}>
                Checking for debits, renewals, and trial alerts.
              </p>
            </div>
          ) : status === 'empty' ? (
            <div className={classes.resultBox}>
              <p className={classes.resultText}>No subscription receipts found in this inbox.</p>
            </div>
          ) : status === 'error' ? (
            <div className={classes.resultBox}>
              <p className={classes.resultText}>{errorMsg}</p>
            </div>
          ) : (
            <p className={classes.description}>
              Would you like to scan this inbox now to automatically detect subscriptions, billing
              amounts, and renewal dates?
            </p>
          )}
        </div>

        <div className={classes.actionsRow}>
          {status !== 'prompt' ? (
            <button type="button" onClick={handleClose} className={classes.primaryBtn}>
              Done
            </button>
          ) : (
            <>
              <button
                type="button"
                disabled={isScanning}
                onClick={handleClose}
                className={classes.secondaryBtn}
              >
                Maybe later
              </button>
              <button
                type="button"
                disabled={isScanning}
                onClick={handleStartScan}
                className={classes.primaryBtn}
              >
                <RefreshCw size={14} className={isScanning ? 'spin' : ''} />
                <span>{isScanning ? 'Scanning...' : 'Scan now'}</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

import { useRef } from 'react';
import { Sparkles, X } from 'lucide-react';
import { useClickOutside } from '@/modules/common/hooks/useClickOutside';
import { useFocusTrap } from '@/modules/common/hooks/useFocusTrap';
import { useLockBodyScroll } from '@/modules/common/hooks/useLockBodyScroll';
import { DiscoveredSubCard } from '@/modules/sync/components/DiscoveredSubCard';
import { syncModalStyles } from '@/modules/sync/recipes/syncModal.recipe';
import { DiscoveredSubscription } from '@/modules/sync/types/sync.types';

interface DiscoveredSubsModalProps {
  isOpen: boolean;
  onClose: () => void;
  discoveredSubs: DiscoveredSubscription[];
  onToggle: (id: string) => void;
  onConfirm: (selected: DiscoveredSubscription[]) => Promise<void> | void;
}

export function DiscoveredSubsModal({
  isOpen,
  onClose,
  discoveredSubs,
  onToggle,
  onConfirm,
}: DiscoveredSubsModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const classes = syncModalStyles();

  useClickOutside(modalRef, onClose, isOpen);
  useFocusTrap(modalRef, isOpen, { onEscape: onClose });
  useLockBodyScroll(isOpen && discoveredSubs.length > 0);

  if (!isOpen || discoveredSubs.length === 0) return null;

  const selectedSubs = discoveredSubs.filter((s) => s.isSelected);

  const handleConfirm = async () => {
    if (selectedSubs.length === 0) return;
    await onConfirm(selectedSubs);
    onClose();
  };

  return (
    <div className={classes.backdrop} role="dialog" aria-modal="true" aria-labelledby="disc-title">
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
          <div className={classes.titleRow}>
            <Sparkles size={20} color="var(--colors-accent-primary)" />
            <h2 id="disc-title">Subscriptions detected</h2>
            <span>{discoveredSubs.length}</span>
          </div>
          <p className={classes.subtitle}>
            Review items found in your emails. Uncheck any false positives before adding to your
            commitments.
          </p>
        </header>

        <div className={classes.cardsList}>
          {discoveredSubs.map((sub) => (
            <DiscoveredSubCard key={sub.id} item={sub} onToggle={onToggle} />
          ))}
        </div>

        <div className={classes.actionsRow}>
          <button type="button" onClick={onClose} className={classes.dismissBtn}>
            Dismiss
          </button>
          <button
            type="button"
            disabled={selectedSubs.length === 0}
            onClick={handleConfirm}
            className={classes.confirmBtn}
          >
            Add {selectedSubs.length} {selectedSubs.length === 1 ? 'subscription' : 'subscriptions'}
          </button>
        </div>
      </div>
    </div>
  );
}

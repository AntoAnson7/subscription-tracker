import { useRef } from 'react';
import { CreditCard, X } from 'lucide-react';
import { useCurrency } from '@/modules/common/hooks/useCurrency';
import { useClickOutside } from '@/modules/common/hooks/useClickOutside';
import { useFocusTrap } from '@/modules/common/hooks/useFocusTrap';
import { paymentDrawerStyles } from '@/modules/sync/recipes/paymentDrawer.recipe';
import { PaymentRecord } from '@/modules/sync/types/sync.types';

interface PaymentHistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  subscriptionName: string;
  payments: PaymentRecord[];
}

export function PaymentHistoryDrawer({
  isOpen,
  onClose,
  subscriptionName,
  payments,
}: PaymentHistoryDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const classes = paymentDrawerStyles();
  const { format } = useCurrency();

  useClickOutside(drawerRef, onClose, isOpen);
  useFocusTrap(drawerRef, isOpen, { onEscape: onClose });

  if (!isOpen) return null;

  return (
    <div className={classes.backdrop} role="dialog" aria-modal="true" aria-labelledby="pay-title">
      <div ref={drawerRef} className={classes.drawer}>
        <button type="button" onClick={onClose} className={classes.closeBtn} aria-label="Close">
          <X size={16} />
        </button>

        <header className={classes.header}>
          <h2 id="pay-title" className={classes.title}>
            Payment debits & receipts
          </h2>
          <p className={classes.subtitle}>
            Verified transactions detected from emails for {subscriptionName}
          </p>
        </header>

        {payments.length === 0 ? (
          <div className={classes.emptyState}>
            No past debits or email receipts matched for this subscription yet.
          </div>
        ) : (
          <div className={classes.paymentsList}>
            {payments.map((p) => (
              <div key={p.id} className={classes.paymentRow}>
                <div className={classes.paymentLeft}>
                  <CreditCard size={18} className={classes.paymentIcon} />
                  <div className={classes.paymentDetails}>
                    <span className={classes.paymentDate}>
                      {new Date(p.paymentDate).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                    <span className={classes.paymentSource}>Via {p.sourceEmail}</span>
                  </div>
                </div>
                <span className={classes.paymentAmount}>{format(p.amount)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

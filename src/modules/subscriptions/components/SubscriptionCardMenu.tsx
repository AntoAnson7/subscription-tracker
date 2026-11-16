import { useRef, useState } from 'react';
import { ExternalLink, MoreVertical, Pencil, RotateCcw, Trash2, XCircle } from 'lucide-react';
import { ConfirmDialog } from '@/modules/common/components/ConfirmDialog';
import { useClickOutside } from '@/modules/common/hooks/useClickOutside';
import { sanitizeUrl } from '@/modules/common/utils/url.utils';
import { useCardMenuPlacement } from '@/modules/subscriptions/hooks/useCardMenuPlacement';
import { subscriptionCardMenuStyles } from '@/modules/subscriptions/recipes/subscriptionCardMenu.recipe';
import { Subscription } from '@/modules/subscriptions/types/subscription.types';

interface SubscriptionCardMenuProps {
  subscription: Subscription;
  onEdit?: (subscription: Subscription) => void;
  onCancel?: (id: string) => void;
  onRenew?: (subscription: Subscription) => void;
  onDelete?: (id: string) => void;
  placement?: 'top' | 'bottom';
}

export function SubscriptionCardMenu({
  subscription,
  onEdit,
  onCancel,
  onRenew,
  onDelete,
  placement = 'top',
}: SubscriptionCardMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [confirmAction, setConfirmAction] = useState<'cancel' | 'delete' | null>(null);
  const { isOpen, actualPlacement, toggle, close } = useCardMenuPlacement(menuRef, placement);
  const classes = subscriptionCardMenuStyles({ placement: actualPlacement });
  const isCancelled = subscription.status === 'cancelled';

  useClickOutside(menuRef, close, isOpen);

  return (
    <>
      <div ref={menuRef} className={classes.root}>
        <button
          type="button"
          onClick={toggle}
          className={classes.trigger}
          aria-haspopup="menu"
          aria-expanded={isOpen}
          aria-label={`Actions for ${subscription.name}`}
        >
          <MoreVertical size={15} />
        </button>

        {isOpen && (
          <div className={classes.menu} role="menu">
            {onEdit && (
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  close();
                  onEdit(subscription);
                }}
                className={classes.item}
              >
                <Pencil size={13} />
                <span>Edit</span>
              </button>
            )}

            {isCancelled && onRenew ? (
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  close();
                  onRenew(subscription);
                }}
                className={classes.item}
              >
                <RotateCcw size={13} />
                <span>Renew</span>
              </button>
            ) : null}

            {!isCancelled && onCancel ? (
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  close();
                  setConfirmAction('cancel');
                }}
                className={classes.itemDanger}
              >
                <XCircle size={13} />
                <span>Cancel</span>
              </button>
            ) : null}

            {onDelete && (
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  close();
                  setConfirmAction('delete');
                }}
                className={classes.itemDanger}
              >
                <Trash2 size={13} />
                <span>Delete</span>
              </button>
            )}

            {sanitizeUrl(subscription.cancellationUrl) && (
              <a
                href={sanitizeUrl(subscription.cancellationUrl)!}
                target="_blank"
                rel="noopener noreferrer"
                role="menuitem"
                onClick={close}
                className={classes.item}
              >
                <ExternalLink size={13} />
                <span>Manage on web</span>
              </a>
            )}
          </div>
        )}
      </div>

      <ConfirmDialog
        isOpen={confirmAction !== null}
        onClose={() => setConfirmAction(null)}
        onConfirm={() => {
          if (confirmAction === 'cancel' && onCancel) onCancel(subscription.id);
          if (confirmAction === 'delete' && onDelete) onDelete(subscription.id);
        }}
        title={confirmAction === 'cancel' ? 'Cancel subscription?' : 'Delete subscription?'}
        description={
          confirmAction === 'cancel'
            ? `Are you sure you want to cancel ${subscription.name}? It will be marked as cancelled and moved to your cancelled subscriptions list.`
            : `Are you sure you want to delete ${subscription.name}? This will permanently remove it from your records.`
        }
        confirmLabel={confirmAction === 'cancel' ? 'Cancel Subscription' : 'Delete Subscription'}
        cancelLabel={confirmAction === 'cancel' ? 'Keep Subscription' : 'Cancel'}
        variant={confirmAction === 'cancel' ? 'warning' : 'danger'}
        icon={confirmAction === 'cancel' ? 'cancel' : 'trash'}
      />
    </>
  );
}

import { useEffect, useRef, useState } from 'react';
import { ExternalLink, MoreVertical, Pencil, RotateCcw, XCircle } from 'lucide-react';
import { useClickOutside } from '@/modules/common/hooks/useClickOutside';
import { subscriptionCardMenuStyles } from '@/modules/subscriptions/recipes/subscriptionCardMenu.recipe';
import { Subscription } from '@/modules/subscriptions/types/subscription.types';

interface SubscriptionCardMenuProps {
  subscription: Subscription;
  onEdit?: (subscription: Subscription) => void;
  onCancel?: (id: string) => void;
  onRenew?: (subscription: Subscription) => void;
}

export function SubscriptionCardMenu({
  subscription,
  onEdit,
  onCancel,
  onRenew,
}: SubscriptionCardMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const classes = subscriptionCardMenuStyles();
  const isCancelled = subscription.status === 'cancelled';

  useClickOutside(menuRef, () => setIsOpen(false), isOpen);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <div ref={menuRef} className={classes.root}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
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
                setIsOpen(false);
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
                setIsOpen(false);
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
                setIsOpen(false);
                onCancel(subscription.id);
              }}
              className={classes.itemDanger}
            >
              <XCircle size={13} />
              <span>Cancel</span>
            </button>
          ) : null}

          {subscription.cancellationUrl && (
            <a
              href={subscription.cancellationUrl}
              target="_blank"
              rel="noreferrer"
              role="menuitem"
              onClick={() => setIsOpen(false)}
              className={classes.item}
            >
              <ExternalLink size={13} />
              <span>Manage on web</span>
            </a>
          )}
        </div>
      )}
    </div>
  );
}

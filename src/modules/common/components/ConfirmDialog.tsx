import { useRef, useState } from 'react';
import { AlertTriangle, Trash2, Unlink, XCircle } from 'lucide-react';
import { useClickOutside } from '@/modules/common/hooks/useClickOutside';
import { useFocusTrap } from '@/modules/common/hooks/useFocusTrap';
import { useLockBodyScroll } from '@/modules/common/hooks/useLockBodyScroll';
import { confirmDialogStyles } from '@/modules/common/recipes/confirmDialog.recipe';

export type ConfirmVariant = 'danger' | 'warning' | 'default';
export type ConfirmIconType = 'trash' | 'warning' | 'cancel' | 'unlink';

export interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: ConfirmVariant;
  icon?: ConfirmIconType;
}

function renderIcon(iconType: ConfirmIconType, variant: ConfirmVariant) {
  switch (iconType) {
    case 'trash':
      return <Trash2 size={20} />;
    case 'unlink':
      return <Unlink size={20} />;
    case 'cancel':
      return <XCircle size={20} />;
    case 'warning':
    default:
      return <AlertTriangle size={20} color={variant === 'danger' ? '#EF4444' : '#D97706'} />;
  }
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'danger',
  icon = 'warning',
}: ConfirmDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [submitting, setSubmitting] = useState(false);
  const classes = confirmDialogStyles({ variant });

  useClickOutside(dialogRef, submitting ? () => {} : onClose, isOpen);
  useFocusTrap(dialogRef, isOpen, { onEscape: submitting ? undefined : onClose });
  useLockBodyScroll(isOpen);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    try {
      setSubmitting(true);
      await onConfirm();
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className={`${classes.backdrop} backdrop-animated`}
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-desc"
    >
      <div ref={dialogRef} className={`${classes.dialog} modal-animated`}>
        <div className={classes.header}>
          <div className={classes.iconContainer} aria-hidden="true">
            {renderIcon(icon, variant)}
          </div>
          <div className={classes.content}>
            <h2 id="confirm-dialog-title" className={classes.title}>
              {title}
            </h2>
            <p id="confirm-dialog-desc" className={classes.description}>
              {description}
            </p>
          </div>
        </div>

        <div className={classes.footer}>
          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            className={classes.cancelBtn}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={submitting}
            className={classes.confirmBtn}
          >
            {submitting ? 'Please wait...' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

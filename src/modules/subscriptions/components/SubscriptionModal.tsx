import { useEffect, useRef } from 'react';
import { Trash2, X } from 'lucide-react';
import { useClickOutside } from '@/modules/common/hooks/useClickOutside';
import { SubscriptionFormFields } from '@/modules/subscriptions/components/SubscriptionFormFields';
import { useSubscriptionForm } from '@/modules/subscriptions/hooks/useSubscriptionForm';
import { subscriptionModalStyles } from '@/modules/subscriptions/recipes/subscriptionModal.recipe';
import { SubscriptionFormData } from '@/modules/subscriptions/types/form.types';
import { Subscription } from '@/modules/subscriptions/types/subscription.types';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: SubscriptionFormData) => Promise<void> | void;
  onDelete?: (id: string) => Promise<void> | void;
  initialSubscription?: Subscription | null;
}

export function SubscriptionModal({
  isOpen,
  onClose,
  onSubmit,
  onDelete,
  initialSubscription,
}: SubscriptionModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const classes = subscriptionModalStyles();
  const isEditing = Boolean(initialSubscription);

  const form = useSubscriptionForm(async (data) => {
    await onSubmit(data);
    onClose();
  }, initialSubscription);

  const handleClose = () => {
    form.resetForm();
    onClose();
  };

  const handleDelete = async () => {
    if (!initialSubscription || !onDelete) return;
    if (window.confirm(`Delete ${initialSubscription.name}?`)) {
      await onDelete(initialSubscription.id);
      onClose();
    }
  };

  useClickOutside(modalRef, handleClose, isOpen);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        form.resetForm();
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose, form]);

  if (!isOpen) return null;
  const { formData } = form;

  return (
    <div
      className={`${classes.backdrop} backdrop-animated`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="sub-modal-title"
    >
      <div ref={modalRef} className={`${classes.modal} modal-animated`}>
        <header className={classes.header}>
          <h2 id="sub-modal-title" className={classes.title}>
            {isEditing ? 'Edit Subscription' : 'Add Subscription'}
          </h2>
          <button
            type="button"
            onClick={handleClose}
            className={classes.closeBtn}
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </header>

        <form onSubmit={form.handleSubmit} className={classes.form}>
          <SubscriptionFormFields
            formData={formData}
            updateField={form.updateField}
            suggestions={form.suggestions}
            onNameChange={form.handleNameChange}
            onSelectPreset={form.applyPreset}
          />

          <div className={classes.footer}>
            {isEditing && onDelete && (
              <button
                type="button"
                onClick={handleDelete}
                className={classes.deleteBtn}
                aria-label="Delete subscription"
              >
                <Trash2 size={13} />
                <span>Delete</span>
              </button>
            )}
            <button type="button" onClick={handleClose} className={classes.cancelBtn}>
              Cancel
            </button>
            <button type="submit" disabled={form.isSubmitting} className={classes.submitBtn}>
              {form.isSubmitting ? 'Saving...' : isEditing ? 'Save Changes' : 'Save Subscription'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

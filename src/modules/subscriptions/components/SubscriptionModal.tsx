import { useRef, useState } from 'react';
import { Trash2, X } from 'lucide-react';
import { ConfirmDialog } from '@/modules/common/components/ConfirmDialog';
import { useClickOutside } from '@/modules/common/hooks/useClickOutside';
import { useFocusTrap } from '@/modules/common/hooks/useFocusTrap';
import { useLockBodyScroll } from '@/modules/common/hooks/useLockBodyScroll';
import { getBrandIconUrl } from '@/modules/common/utils/icons.utils';
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
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
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

  const handleConfirmDelete = async () => {
    if (!initialSubscription || !onDelete) return;
    await onDelete(initialSubscription.id);
    setIsDeleteConfirmOpen(false);
    onClose();
  };

  useClickOutside(modalRef, handleClose, isOpen && !isDeleteConfirmOpen);
  useFocusTrap(modalRef, isOpen && !isDeleteConfirmOpen, { onEscape: handleClose });
  useLockBodyScroll(isOpen);

  if (!isOpen) return null;
  const { formData } = form;
  const headerIconUrl = getBrandIconUrl(formData.iconSlug, formData.websiteUrl);

  return (
    <>
      <div
        className={`${classes.backdrop} backdrop-animated`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="sub-modal-title"
      >
        <div ref={modalRef} className={`${classes.modal} modal-animated`}>
          <header className={classes.header}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {headerIconUrl && (
                <img
                  src={headerIconUrl}
                  alt=""
                  width={24}
                  height={24}
                  style={{ borderRadius: '6px', objectFit: 'contain' }}
                />
              )}
              <h2 id="sub-modal-title" className={classes.title}>
                {isEditing ? 'Edit subscription' : 'Add subscription'}
              </h2>
            </div>
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
            <div className={classes.body}>
              <SubscriptionFormFields
                formData={formData}
                updateField={form.updateField}
                suggestions={form.suggestions}
                onNameChange={form.handleNameChange}
                onSelectPreset={form.applyPreset}
              />
            </div>

            <div className={classes.footer}>
              {isEditing && onDelete && (
                <button
                  type="button"
                  onClick={() => setIsDeleteConfirmOpen(true)}
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

      <ConfirmDialog
        isOpen={isDeleteConfirmOpen}
        onClose={() => setIsDeleteConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete subscription?"
        description={`Are you sure you want to delete ${initialSubscription?.name || 'this subscription'}? This will permanently remove it from your records.`}
        confirmLabel="Delete Subscription"
        variant="danger"
        icon="trash"
      />
    </>
  );
}

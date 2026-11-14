import { useRef } from 'react';
import { X } from 'lucide-react';
import { CustomInput } from '@/modules/common/components/CustomInput';
import { CustomSelect } from '@/modules/common/components/CustomSelect';
import { useClickOutside } from '@/modules/common/hooks/useClickOutside';
import { useSubscriptionForm } from '@/modules/subscriptions/hooks/useSubscriptionForm';
import { autocompleteStyles } from '@/modules/subscriptions/recipes/autocomplete.recipe';
import { subscriptionModalStyles } from '@/modules/subscriptions/recipes/subscriptionModal.recipe';
import { SubscriptionFormData } from '@/modules/subscriptions/types/form.types';
import {
  BillingCycle,
  SubscriptionCategory,
} from '@/modules/subscriptions/types/subscription.types';
import { CATEGORY_OPTIONS, CYCLE_OPTIONS } from '@/modules/subscriptions/utils/formOptions.utils';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (data: SubscriptionFormData) => Promise<void> | void;
}

export function SubscriptionModal({ isOpen, onClose, onAdd }: SubscriptionModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const classes = subscriptionModalStyles();
  const auto = autocompleteStyles();

  const form = useSubscriptionForm(async (data) => {
    await onAdd(data);
    onClose();
  });

  const handleClose = () => {
    form.resetForm();
    onClose();
  };

  useClickOutside(modalRef, handleClose, isOpen);
  if (!isOpen) return null;
  const { formData } = form;

  return (
    <div
      className={`${classes.backdrop} backdrop-animated`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-sub-title"
    >
      <div ref={modalRef} className={`${classes.modal} modal-animated`}>
        <header className={classes.header}>
          <h2 id="add-sub-title" className={classes.title}>
            Add Subscription
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
          <div className={auto.root}>
            <CustomInput
              label="Service Name"
              required
              placeholder="e.g. Netflix, Spotify, Claude, AWS"
              value={formData.name}
              onChange={(e) => form.handleNameChange(e.target.value)}
            />
            {form.suggestions.length > 0 && (
              <div className={auto.menu} role="listbox">
                {form.suggestions.map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    role="option"
                    aria-selected="false"
                    onClick={() => form.applyPreset(item)}
                    className={auto.item}
                  >
                    <div className={auto.icon} style={{ background: item.brandColor }}>
                      {item.name.slice(0, 2).toUpperCase()}
                    </div>
                    <span className={auto.name}>{item.name}</span>
                    <span className={auto.category}>{item.category}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className={classes.grid}>
            <CustomInput
              label="Cost"
              type="number"
              step="0.01"
              min="0"
              required
              value={formData.cost}
              onChange={(e) => form.updateField('cost', parseFloat(e.target.value) || 0)}
            />
            <CustomSelect
              label="Billing Cycle"
              value={formData.cycle}
              onChange={(val) => form.updateField('cycle', val as BillingCycle)}
              options={CYCLE_OPTIONS}
            />
          </div>

          <div className={classes.grid}>
            <CustomSelect
              label="Category"
              value={formData.category}
              onChange={(val) => form.updateField('category', val as SubscriptionCategory)}
              options={CATEGORY_OPTIONS}
            />
            <CustomInput
              label="Next Renewal Date"
              type="date"
              required
              value={formData.renewalDate}
              onChange={(e) => form.updateField('renewalDate', e.target.value)}
            />
          </div>

          <CustomInput
            label="Cancellation URL (optional)"
            type="url"
            placeholder="https://..."
            value={formData.cancellationUrl || ''}
            onChange={(e) => form.updateField('cancellationUrl', e.target.value || null)}
          />

          <div className={classes.footer}>
            <button type="button" onClick={handleClose} className={classes.cancelBtn}>
              Cancel
            </button>
            <button type="submit" disabled={form.isSubmitting} className={classes.submitBtn}>
              {form.isSubmitting ? 'Saving...' : 'Save Subscription'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

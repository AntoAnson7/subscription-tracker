import { X } from 'lucide-react';
import { useSubscriptionForm } from '@/modules/subscriptions/hooks/useSubscriptionForm';
import { subscriptionModalStyles } from '@/modules/subscriptions/recipes/subscriptionModal.recipe';
import { SubscriptionFormData } from '@/modules/subscriptions/types/form.types';
import {
  BillingCycle,
  SubscriptionCategory,
} from '@/modules/subscriptions/types/subscription.types';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (data: SubscriptionFormData) => Promise<void> | void;
}

export function SubscriptionModal({ isOpen, onClose, onAdd }: SubscriptionModalProps) {
  const classes = subscriptionModalStyles();
  const { formData, isSubmitting, handleNameChange, updateField, handleSubmit, resetForm } =
    useSubscriptionForm(async (data) => {
      await onAdd(data);
      onClose();
    });

  if (!isOpen) return null;

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <div className={classes.backdrop} onClick={handleClose}>
      <div className={classes.modal} onClick={(e) => e.stopPropagation()}>
        <header className={classes.header}>
          <h2 className={classes.title}>Add Subscription</h2>
          <button
            type="button"
            onClick={handleClose}
            className={classes.closeBtn}
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </header>

        <form onSubmit={handleSubmit} className={classes.form}>
          <div className={classes.field}>
            <label className={classes.label}>Service Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Netflix, Spotify, Claude, AWS"
              value={formData.name}
              onChange={(e) => handleNameChange(e.target.value)}
              className={classes.input}
            />
          </div>

          <div className={classes.grid}>
            <div className={classes.field}>
              <label className={classes.label}>Cost</label>
              <input
                type="number"
                step="0.01"
                min="0"
                required
                value={formData.cost}
                onChange={(e) => updateField('cost', parseFloat(e.target.value) || 0)}
                className={classes.input}
              />
            </div>

            <div className={classes.field}>
              <label className={classes.label}>Billing Cycle</label>
              <select
                value={formData.cycle}
                onChange={(e) => updateField('cycle', e.target.value as BillingCycle)}
                className={classes.select}
              >
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
                <option value="quarterly">Quarterly</option>
                <option value="weekly">Weekly</option>
              </select>
            </div>
          </div>

          <div className={classes.grid}>
            <div className={classes.field}>
              <label className={classes.label}>Category</label>
              <select
                value={formData.category}
                onChange={(e) => updateField('category', e.target.value as SubscriptionCategory)}
                className={classes.select}
              >
                <option value="Entertainment">Entertainment</option>
                <option value="Productivity & AI">Productivity & AI</option>
                <option value="Bundled Services">Bundled Services</option>
                <option value="Developer Tools">Developer Tools</option>
                <option value="Design & Craft">Design & Craft</option>
                <option value="Health & Fitness">Health & Fitness</option>
                <option value="Cloud & Hosting">Cloud & Hosting</option>
                <option value="Utilities">Utilities</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className={classes.field}>
              <label className={classes.label}>Next Renewal Date</label>
              <input
                type="date"
                required
                value={formData.renewalDate}
                onChange={(e) => updateField('renewalDate', e.target.value)}
                className={classes.input}
              />
            </div>
          </div>

          <div className={classes.field}>
            <label className={classes.label}>Cancellation URL (optional)</label>
            <input
              type="url"
              placeholder="https://..."
              value={formData.cancellationUrl || ''}
              onChange={(e) => updateField('cancellationUrl', e.target.value || null)}
              className={classes.input}
            />
          </div>

          <div className={classes.footer}>
            <button type="button" onClick={handleClose} className={classes.cancelBtn}>
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting} className={classes.submitBtn}>
              {isSubmitting ? 'Saving...' : 'Save Subscription'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

import { useRef } from 'react';
import { CheckCircle2, User as UserIcon } from 'lucide-react';
import { User } from '@supabase/supabase-js';
import { useOnboardingForm } from '@/modules/auth/hooks/useOnboardingForm';
import { onboardingModalStyles } from '@/modules/auth/recipes/onboardingModal.recipe';
import { CreateProfileData, TrackingFocus } from '@/modules/auth/types/auth.types';
import { CustomInput } from '@/modules/common/components/CustomInput';
import { CustomSelect } from '@/modules/common/components/CustomSelect';
import { useFocusTrap } from '@/modules/common/hooks/useFocusTrap';

interface OnboardingModalProps {
  isOpen: boolean;
  user: User | null;
  onSubmit: (data: CreateProfileData) => Promise<boolean> | boolean;
}

const CURRENCY_OPTIONS = [
  { value: 'USD', label: 'USD ($)' },
  { value: 'EUR', label: 'EUR (€)' },
  { value: 'GBP', label: 'GBP (£)' },
  { value: 'CAD', label: 'CAD ($)' },
  { value: 'AUD', label: 'AUD ($)' },
  { value: 'INR', label: 'INR (₹)' },
  { value: 'JPY', label: 'JPY (¥)' },
];

const FOCUS_OPTIONS = [
  { value: 'Personal', label: 'Personal subscriptions' },
  { value: 'Work & Business', label: 'Work & SaaS tools' },
  { value: 'Family Sharing', label: 'Family & household' },
];

export function OnboardingModal({ isOpen, user, onSubmit }: OnboardingModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const classes = onboardingModalStyles();
  const { formData, submitting, updateField, handleSubmit } = useOnboardingForm(user, onSubmit);

  useFocusTrap(modalRef, isOpen);

  if (!isOpen || !user) return null;

  const avatarUrl =
    (user.user_metadata?.avatar_url as string | undefined) ??
    (user.user_metadata?.picture as string | undefined);

  return (
    <div
      className={`${classes.backdrop} backdrop-animated`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="onboarding-title"
    >
      <div ref={modalRef} className={`${classes.modal} modal-animated`}>
        <header className={classes.header}>
          <div className={classes.avatarWrapper}>
            {avatarUrl ? (
              <img src={avatarUrl} alt="Google Avatar" className={classes.avatarImg} />
            ) : (
              <UserIcon size={24} />
            )}
          </div>
          <h2 id="onboarding-title" className={classes.title}>
            Complete account setup
          </h2>
          <p className={classes.subtitle}>
            We found your Google profile. Confirm your details to finish creating your SubTrack
            account.
          </p>
        </header>

        <form onSubmit={handleSubmit} className={classes.form}>
          <div className={classes.field}>
            <label className={classes.label}>Connected Google account</label>
            <div className={classes.emailBadge}>
              <CheckCircle2 size={14} color="#10B981" />
              <span>{user.email}</span>
            </div>
          </div>

          <CustomInput
            label="Full name"
            required
            value={formData.fullName}
            onChange={(e) => updateField('fullName', e.target.value)}
            placeholder="e.g. Jane Doe"
          />

          <CustomSelect
            label="Preferred currency"
            value={formData.preferredCurrency}
            onChange={(val) => updateField('preferredCurrency', val)}
            options={CURRENCY_OPTIONS}
          />

          <CustomSelect
            label="Tracking focus"
            value={formData.trackingFocus}
            onChange={(val) => updateField('trackingFocus', val as TrackingFocus)}
            options={FOCUS_OPTIONS}
          />

          <button type="submit" disabled={submitting} className={classes.submitBtn}>
            {submitting ? 'Setting up...' : 'Create account & start tracking'}
          </button>
        </form>
      </div>
    </div>
  );
}

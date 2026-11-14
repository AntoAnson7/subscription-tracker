import { CheckCircle2, User as UserIcon } from 'lucide-react';
import { User } from '@supabase/supabase-js';
import { useOnboardingForm } from '@/modules/auth/hooks/useOnboardingForm';
import { onboardingModalStyles } from '@/modules/auth/recipes/onboardingModal.recipe';
import { CreateProfileData, TrackingFocus } from '@/modules/auth/types/auth.types';

interface OnboardingModalProps {
  isOpen: boolean;
  user: User | null;
  onSubmit: (data: CreateProfileData) => Promise<boolean> | boolean;
}

export function OnboardingModal({ isOpen, user, onSubmit }: OnboardingModalProps) {
  const classes = onboardingModalStyles();
  const { formData, submitting, updateField, handleSubmit } = useOnboardingForm(user, onSubmit);

  if (!isOpen || !user) return null;

  const avatarUrl =
    (user.user_metadata?.avatar_url as string | undefined) ??
    (user.user_metadata?.picture as string | undefined);

  return (
    <div className={classes.backdrop}>
      <div className={classes.modal}>
        <header className={classes.header}>
          <div className={classes.avatarWrapper}>
            {avatarUrl ? (
              <img src={avatarUrl} alt="Google Avatar" className={classes.avatarImg} />
            ) : (
              <UserIcon size={24} />
            )}
          </div>
          <h2 className={classes.title}>Complete Account Setup</h2>
          <p className={classes.subtitle}>
            We found your Google profile. Confirm your details to finish creating your SubTrack
            account.
          </p>
        </header>

        <form onSubmit={handleSubmit} className={classes.form}>
          <div className={classes.field}>
            <label className={classes.label}>Connected Google Account</label>
            <div className={classes.emailBadge}>
              <CheckCircle2 size={14} color="#10B981" />
              <span>{user.email}</span>
            </div>
          </div>

          <div className={classes.field}>
            <label className={classes.label}>Full Name</label>
            <input
              type="text"
              required
              value={formData.fullName}
              onChange={(e) => updateField('fullName', e.target.value)}
              className={classes.input}
              placeholder="e.g. Jane Doe"
            />
          </div>

          <div className={classes.field}>
            <label className={classes.label}>Preferred Currency</label>
            <select
              value={formData.preferredCurrency}
              onChange={(e) => updateField('preferredCurrency', e.target.value)}
              className={classes.select}
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="CAD">CAD ($)</option>
              <option value="AUD">AUD ($)</option>
              <option value="INR">INR (₹)</option>
              <option value="JPY">JPY (¥)</option>
            </select>
          </div>

          <div className={classes.field}>
            <label className={classes.label}>Tracking Focus</label>
            <select
              value={formData.trackingFocus}
              onChange={(e) => updateField('trackingFocus', e.target.value as TrackingFocus)}
              className={classes.select}
            >
              <option value="Personal">Personal Subscriptions</option>
              <option value="Work & Business">Work & SaaS Tools</option>
              <option value="Family Sharing">Family & Household</option>
            </select>
          </div>

          <button type="submit" disabled={submitting} className={classes.submitBtn}>
            {submitting ? 'Setting up...' : 'Create Account & Start Tracking'}
          </button>
        </form>
      </div>
    </div>
  );
}

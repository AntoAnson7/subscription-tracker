import { useState } from 'react';
import { X } from 'lucide-react';
import { authModalStyles } from '@/modules/auth/recipes/authModal.recipe';
import { AuthMode } from '@/modules/auth/types/auth.types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignIn: (email: string, pass: string) => Promise<boolean>;
  onSignUp: (email: string, pass: string) => Promise<boolean>;
  error: string | null;
}

export function AuthModal({ isOpen, onClose, onSignIn, onSignUp, error }: AuthModalProps) {
  const [mode, setMode] = useState<AuthMode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const classes = authModalStyles();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setSubmitting(true);
    const success =
      mode === 'signin' ? await onSignIn(email, password) : await onSignUp(email, password);
    setSubmitting(false);
    if (success) {
      onClose();
    }
  };

  return (
    <div className={classes.backdrop} onClick={onClose}>
      <div className={classes.modal} onClick={(e) => e.stopPropagation()}>
        <button type="button" onClick={onClose} className={classes.closeBtn} aria-label="Close">
          <X size={16} />
        </button>

        <header className={classes.header}>
          <h2 className={classes.title}>{mode === 'signin' ? 'Welcome Back' : 'Create Account'}</h2>
          <p className={classes.subtitle}>
            {mode === 'signin'
              ? 'Sign in to sync your subscriptions securely across all devices.'
              : 'Sign up to start tracking your subscriptions with real-time sync.'}
          </p>
        </header>

        {error && <div className={classes.errorText}>{error}</div>}

        <form onSubmit={handleSubmit} className={classes.form}>
          <div className={classes.field}>
            <label className={classes.label}>Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@domain.com"
              className={classes.input}
            />
          </div>

          <div className={classes.field}>
            <label className={classes.label}>Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={classes.input}
            />
          </div>

          <button type="submit" disabled={submitting} className={classes.submitBtn}>
            {submitting ? 'Processing...' : mode === 'signin' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <button
          type="button"
          onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
          className={classes.switchBtn}
        >
          {mode === 'signin'
            ? "Don't have an account? Sign Up"
            : 'Already have an account? Sign In'}
        </button>
      </div>
    </div>
  );
}

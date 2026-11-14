import { CreditCard, Moon, Sun, User as UserIcon } from 'lucide-react';
import { UserProfile } from '@/modules/auth/types/auth.types';
import { CurrencySelector } from '@/modules/common/components/CurrencySelector';
import { useTheme } from '@/modules/common/hooks/useTheme';
import { headerStyles } from '@/modules/common/recipes/header.recipe';

interface HeaderProps {
  user: { email?: string; user_metadata?: Record<string, string | undefined> } | null;
  profile?: UserProfile | null;
  onOpenAuth: () => void;
  onSignOut: () => void;
}

export function Header({ user, profile, onOpenAuth, onSignOut }: HeaderProps) {
  const { isDark, toggleMode } = useTheme();
  const classes = headerStyles();

  const avatarUrl =
    profile?.avatarUrl ?? user?.user_metadata?.avatar_url ?? user?.user_metadata?.picture;

  const displayName = profile?.fullName || user?.email || 'User';
  const userInitial = displayName.slice(0, 2).toUpperCase();

  return (
    <header className={classes.root}>
      <div className={classes.container}>
        <div className={classes.brand}>
          <div className={classes.brandIcon}>
            <CreditCard size={18} strokeWidth={2.2} />
          </div>
          <div>
            <span className={classes.brandText}>SubTrack</span>
            <span className={classes.brandPill}>TITANIUM</span>
          </div>
        </div>

        <div className={classes.controls}>
          <CurrencySelector />

          <button
            type="button"
            onClick={toggleMode}
            title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
            className={classes.themeBtn}
          >
            {isDark ? <Sun size={14} color="#FBBF24" /> : <Moon size={14} color="#6366F1" />}
          </button>

          {user ? (
            <button
              type="button"
              onClick={onSignOut}
              title={`Signed in as ${displayName} (Click to Sign Out)`}
              className={classes.avatar}
            >
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={displayName}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <span>{userInitial}</span>
              )}
            </button>
          ) : (
            <button type="button" onClick={onOpenAuth} className={classes.authBtn}>
              <UserIcon size={13} />
              <span>Sign In</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

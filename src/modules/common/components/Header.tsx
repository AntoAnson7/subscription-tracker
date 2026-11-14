import { CreditCard, Moon, Sun, User as UserIcon } from 'lucide-react';
import { UserProfile } from '@/modules/auth/types/auth.types';
import { CurrencySelector } from '@/modules/common/components/CurrencySelector';
import { HeaderAvatarSkeleton } from '@/modules/common/components/HeaderAvatarSkeleton';
import { useTheme } from '@/modules/common/hooks/useTheme';
import { headerStyles } from '@/modules/common/recipes/header.recipe';

interface HeaderProps {
  user: { email?: string; user_metadata?: Record<string, string | undefined> } | null;
  profile?: UserProfile | null;
  isLoading?: boolean;
  onOpenAuth: () => void;
  onOpenProfile: () => void;
}

export function Header({
  user,
  profile,
  isLoading = false,
  onOpenAuth,
  onOpenProfile,
}: HeaderProps) {
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

          {isLoading ? (
            <HeaderAvatarSkeleton />
          ) : user ? (
            <button
              type="button"
              onClick={onOpenProfile}
              title={`Signed in as ${displayName} • View Profile`}
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

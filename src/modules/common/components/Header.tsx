import { Moon, Sun, User as UserIcon } from 'lucide-react';
import { UserProfile } from '@/modules/auth/types/auth.types';
import { HeaderAvatarSkeleton } from '@/modules/common/components/HeaderAvatarSkeleton';
import { CurrencySelector } from '@/modules/common/components/CurrencySelector';
import { useTheme } from '@/modules/common/hooks/useTheme';
import { headerStyles } from '@/modules/common/recipes/header.recipe';

interface HeaderProps {
  user: { email?: string; user_metadata?: Record<string, string | undefined> } | null;
  profile?: UserProfile | null;
  isLoading?: boolean;
  onOpenAuth: () => void;
  onOpenProfile: () => void;
  onBackToLanding?: () => void;
}

export function Header({
  user,
  profile,
  isLoading = false,
  onOpenAuth,
  onOpenProfile,
  onBackToLanding,
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
        <div
          className={classes.brand}
          onClick={onBackToLanding}
          role={onBackToLanding ? 'button' : undefined}
          tabIndex={onBackToLanding ? 0 : undefined}
          title={onBackToLanding ? 'Go to Home / Landing Page' : undefined}
          style={{ cursor: onBackToLanding ? 'pointer' : 'default' }}
        >
          <div className={classes.brandIcon}>
            <img src="/subwise-icon.png" alt="" className={classes.brandIconImg} />
          </div>
          <span className={classes.brandText}>Subwise</span>
        </div>

        <div className={classes.controls}>
          <CurrencySelector />

          <button
            type="button"
            onClick={toggleMode}
            title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
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
              title={`Signed in as ${displayName} • View profile`}
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
              <span>Sign in</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

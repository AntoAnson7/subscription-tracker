import { CreditCard, Moon, Sun, User as UserIcon } from 'lucide-react';
import { useCurrency } from '@/modules/common/hooks/useCurrency';
import { useTheme } from '@/modules/common/hooks/useTheme';
import { headerStyles } from '@/modules/common/recipes/header.recipe';

interface HeaderProps {
  user: { email?: string } | null;
  onOpenAuth: () => void;
  onSignOut: () => void;
}

export function Header({ user, onOpenAuth, onSignOut }: HeaderProps) {
  const { isDark, toggleMode } = useTheme();
  const { currency } = useCurrency();
  const classes = headerStyles();

  const userInitial = user?.email ? user.email.slice(0, 2).toUpperCase() : null;

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
          <button type="button" className={classes.currencyBtn}>
            <span className="tabular-nums">{currency} ($)</span>
          </button>

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
              title={`Signed in as ${user.email} (Click to Sign Out)`}
              className={classes.avatar}
            >
              <span>{userInitial}</span>
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

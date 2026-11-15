import { ArrowRight, CreditCard, Moon, Sun, User } from 'lucide-react';
import { useTheme } from '@/modules/common/hooks/useTheme';
import { landingHeaderStyles } from '@/modules/landing/recipes/landingHeader.recipe';

interface LandingHeaderProps {
  onOpenAuth: () => void;
  onLaunchApp: () => void;
}

export function LandingHeader({ onOpenAuth, onLaunchApp }: LandingHeaderProps) {
  const { isDark, toggleMode } = useTheme();
  const classes = landingHeaderStyles();

  return (
    <header className={classes.root}>
      <div className={classes.container}>
        <div className={classes.brand} onClick={onLaunchApp} role="button" tabIndex={0}>
          <div className={classes.brandIcon}>
            <CreditCard size={18} strokeWidth={2.2} />
          </div>
          <span className={classes.brandText}>SubTrack</span>
        </div>

        <nav className={classes.navLinks} aria-label="Main navigation">
          <a href="#features" className={classes.navLink}>
            Features
          </a>
          <a href="#interactive-demo" className={classes.navLink}>
            Interactive Demo
          </a>
          <a href="#faq" className={classes.navLink}>
            FAQ
          </a>
        </nav>

        <div className={classes.controls}>
          <button
            type="button"
            onClick={toggleMode}
            title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            className={classes.themeBtn}
          >
            {isDark ? <Sun size={14} color="#FBBF24" /> : <Moon size={14} color="#6366F1" />}
          </button>

          <button type="button" onClick={onOpenAuth} className={classes.signInBtn}>
            <User size={13} />
            <span>Sign In</span>
          </button>

          <button type="button" onClick={onLaunchApp} className={classes.launchBtn}>
            <span>Launch App</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </header>
  );
}

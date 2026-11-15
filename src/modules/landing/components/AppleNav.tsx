import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/modules/common/hooks/useTheme';
import { appleNavStyles } from '@/modules/landing/recipes/appleNav.recipe';

interface AppleNavProps {
  onOpenAuth: () => void;
  onLaunchApp: () => void;
}

export function AppleNav({ onOpenAuth, onLaunchApp }: AppleNavProps) {
  const { isDark, toggleMode } = useTheme();
  const classes = appleNavStyles();

  return (
    <header className={classes.root}>
      <div className={classes.container}>
        <div className={classes.brand} onClick={onLaunchApp} role="button" tabIndex={0}>
          <span className={classes.brandText}>SubTrack</span>
        </div>

        <nav className={classes.links} aria-label="Product navigation">
          <a href="#overview" className={classes.link}>
            Overview
          </a>
          <a href="#features" className={classes.link}>
            Features
          </a>
          <a href="#specs" className={classes.link}>
            Compare
          </a>
          <a href="#faq" className={classes.link}>
            FAQ
          </a>
        </nav>

        <div className={classes.actions}>
          <button
            type="button"
            onClick={toggleMode}
            title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            className={classes.themeBtn}
          >
            {isDark ? <Sun size={13} color="#FBBF24" /> : <Moon size={13} color="#71717A" />}
          </button>

          <button type="button" onClick={onOpenAuth} className={classes.themeBtn} title="Sign in">
            Sign In
          </button>

          <button type="button" onClick={onLaunchApp} className={classes.ctaBtn}>
            Launch App
          </button>
        </div>
      </div>
    </header>
  );
}

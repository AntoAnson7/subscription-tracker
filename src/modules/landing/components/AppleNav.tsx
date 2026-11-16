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

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 56;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth',
      });
    }
  };

  const handleBrandClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={classes.root}>
      <div className={classes.container}>
        <div
          className={classes.brand}
          onClick={handleBrandClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') handleBrandClick();
          }}
        >
          <span className={classes.brandText}>Subwise</span>
        </div>

        <nav className={classes.links} aria-label="Product navigation">
          <a
            href="#overview"
            className={classes.link}
            onClick={(e) => handleNavClick(e, 'overview')}
          >
            Overview
          </a>
          <a
            href="#features"
            className={classes.link}
            onClick={(e) => handleNavClick(e, 'features')}
          >
            Features
          </a>
          <a href="#specs" className={classes.link} onClick={(e) => handleNavClick(e, 'specs')}>
            Compare
          </a>
          <a href="#faq" className={classes.link} onClick={(e) => handleNavClick(e, 'faq')}>
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

          <button type="button" onClick={onOpenAuth} className={classes.signInBtn} title="Sign in">
            Sign in
          </button>

          <button type="button" onClick={onLaunchApp} className={classes.ctaBtn}>
            Launch App
          </button>
        </div>
      </div>
    </header>
  );
}

import { CreditCard, Moon, Sun } from 'lucide-react';
import { useCurrency } from '@/modules/common/hooks/useCurrency';
import { useTheme } from '@/modules/common/hooks/useTheme';
import { headerStyles } from '@/modules/common/recipes/header.recipe';

export function Header() {
  const { isDark, toggleMode } = useTheme();
  const { currency } = useCurrency();
  const classes = headerStyles();

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

          <div className={classes.avatar}>JD</div>
        </div>
      </div>
    </header>
  );
}

import { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { useClickOutside } from '@/modules/common/hooks/useClickOutside';
import { useCurrency } from '@/modules/common/hooks/useCurrency';
import { currencySelectorStyles } from '@/modules/common/recipes/currencySelector.recipe';
import { CurrencyCode } from '@/modules/common/types/currency.types';

export function CurrencySelector() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { currency, symbol, setCurrency, currencies } = useCurrency();
  const classes = currencySelectorStyles();

  // Currently only INR is supported
  const supportedCurrencies = currencies.filter((item) => item.code === 'INR');

  useEffect(() => {
    if (currency !== 'INR') {
      setCurrency('INR');
    }
  }, [currency, setCurrency]);

  useClickOutside(containerRef, () => setIsOpen(false), isOpen);

  const handleSelect = (code: CurrencyCode) => {
    setCurrency(code);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={classes.root}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={classes.trigger}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`Select currency, current is ${currency}`}
      >
        <span className={classes.triggerText}>
          <span className="tabular-nums">{currency}</span>
          <span>({symbol})</span>
        </span>
        <ChevronDown
          size={14}
          className={classes.chevron}
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>

      {isOpen && (
        <div className={classes.menu} role="listbox" aria-label="Available currencies">
          {supportedCurrencies.map((item) => {
            const isSelected = item.code === currency;
            return (
              <button
                key={item.code}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(item.code)}
                className={classes.item}
              >
                <div className={classes.itemLeft}>
                  <div className={classes.itemSymbol}>{item.symbol}</div>
                  <div className={classes.itemDetails}>
                    <span className={classes.itemCode}>{item.code}</span>
                    <span className={classes.itemName}>{item.name}</span>
                  </div>
                </div>
                {isSelected && <Check size={14} color="#6366F1" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

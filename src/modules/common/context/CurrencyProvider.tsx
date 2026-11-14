import { ReactNode, useCallback, useMemo, useState } from 'react';
import { CurrencyContext } from '@/modules/common/context/currency.context';
import { CurrencyCode } from '@/modules/common/types/currency.types';
import {
  formatCurrency,
  getCurrencySymbol,
  SUPPORTED_CURRENCIES,
} from '@/modules/common/utils/currency.utils';

interface CurrencyProviderProps {
  children: ReactNode;
  initialCurrency?: CurrencyCode;
}

export function CurrencyProvider({ children, initialCurrency }: CurrencyProviderProps) {
  const [currency, setCurrencyState] = useState<CurrencyCode>(() => {
    if (initialCurrency && SUPPORTED_CURRENCIES.some((c) => c.code === initialCurrency)) {
      return initialCurrency;
    }
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('subtrack-currency');
      if (saved && SUPPORTED_CURRENCIES.some((c) => c.code === saved)) {
        return saved as CurrencyCode;
      }
    }
    return 'USD';
  });

  const setCurrency = useCallback((nextCode: CurrencyCode) => {
    setCurrencyState(nextCode);
    if (typeof window !== 'undefined') {
      localStorage.setItem('subtrack-currency', nextCode);
    }
  }, []);

  const format = useCallback((amount: number) => formatCurrency(amount, currency), [currency]);

  const symbol = useMemo(() => getCurrencySymbol(currency), [currency]);

  const value = useMemo(
    () => ({
      currency,
      symbol,
      setCurrency,
      format,
      currencies: SUPPORTED_CURRENCIES,
    }),
    [currency, symbol, setCurrency, format]
  );

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

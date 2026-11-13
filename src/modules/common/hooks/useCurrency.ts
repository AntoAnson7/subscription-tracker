import { useState } from 'react';
import { CurrencyCode } from '@/modules/common/types/currency.types';
import { SUPPORTED_CURRENCIES } from '@/modules/common/utils/currency.utils';

export function useCurrency() {
  const [currency, setCurrency] = useState<CurrencyCode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('subtrack-currency');
      if (saved && SUPPORTED_CURRENCIES.some((c) => c.code === saved)) {
        return saved as CurrencyCode;
      }
    }
    return 'USD';
  });

  const changeCurrency = (nextCode: CurrencyCode) => {
    setCurrency(nextCode);
    localStorage.setItem('subtrack-currency', nextCode);
  };

  return {
    currency,
    changeCurrency,
    currencies: SUPPORTED_CURRENCIES,
  };
}

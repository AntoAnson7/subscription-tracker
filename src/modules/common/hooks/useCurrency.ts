import { useContext } from 'react';
import { CurrencyContext, CurrencyContextValue } from '@/modules/common/context/currency.context';
import {
  formatCurrency,
  getCurrencySymbol,
  SUPPORTED_CURRENCIES,
} from '@/modules/common/utils/currency.utils';

const FALLBACK_VALUE: CurrencyContextValue = {
  currency: 'USD',
  symbol: '$',
  setCurrency: () => {},
  format: (amount: number) => formatCurrency(amount, 'USD'),
  currencies: SUPPORTED_CURRENCIES,
};

export function useCurrency(): CurrencyContextValue {
  const context = useContext(CurrencyContext);
  if (!context) {
    return {
      ...FALLBACK_VALUE,
      symbol: getCurrencySymbol('USD'),
    };
  }
  return context;
}

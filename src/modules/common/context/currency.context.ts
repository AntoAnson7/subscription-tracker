import { createContext } from 'react';
import { CurrencyCode, CurrencyInfo } from '@/modules/common/types/currency.types';

export interface CurrencyContextValue {
  currency: CurrencyCode;
  symbol: string;
  setCurrency: (code: CurrencyCode) => void;
  format: (amount: number) => string;
  currencies: CurrencyInfo[];
}

export const CurrencyContext = createContext<CurrencyContextValue | null>(null);

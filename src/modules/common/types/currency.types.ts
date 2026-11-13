export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'INR' | 'JPY' | 'CAD' | 'AUD' | 'CHF' | 'BRL';

export interface CurrencyInfo {
  code: CurrencyCode;
  symbol: string;
  name: string;
}

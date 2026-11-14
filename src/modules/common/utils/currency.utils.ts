import { CurrencyCode, CurrencyInfo } from '@/modules/common/types/currency.types';

export const SUPPORTED_CURRENCIES: CurrencyInfo[] = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'CAD', symbol: '$', name: 'Canadian Dollar' },
  { code: 'AUD', symbol: '$', name: 'Australian Dollar' },
  { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc' },
  { code: 'BRL', symbol: 'R$', name: 'Brazilian Real' },
];

export function getCurrencySymbol(code: CurrencyCode): string {
  return SUPPORTED_CURRENCIES.find((c) => c.code === code)?.symbol ?? '$';
}

export function formatCurrency(
  amount: number,
  currencyCode: CurrencyCode = 'USD',
  locale: string = 'en-US'
): string {
  const isZeroDecimal = currencyCode === 'JPY';
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: isZeroDecimal ? 0 : 2,
    maximumFractionDigits: isZeroDecimal ? 0 : 2,
  }).format(amount);
}

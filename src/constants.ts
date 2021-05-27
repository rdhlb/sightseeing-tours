export enum CurrencyCode {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
  CNY = 'CNY',
  CAD = 'CAD',
}

export const CURRENCY_SYMBOLS: Record<CurrencyCode, string> = {
  USD: '$',
  GBP: '£',
  EUR: '€',
  CNY: '¥',
  CAD: '$',
};

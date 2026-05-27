// Currency configuration - fallback rates if API fails
export const CURRENCIES = {
  BDT: {
    code: 'BDT',
    symbol: '৳',
    name: 'Bangladeshi Taka',
    flag: '🇧🇩',
    fallbackRate: 1,
  },
  USD: {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
    flag: '🇺🇸',
    fallbackRate: 0.0091,
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    name: 'Euro',
    flag: '🇪🇺',
    fallbackRate: 0.0084,
  },
  MYR: {
    code: 'MYR',
    symbol: 'RM',
    name: 'Malaysian Ringgit',
    flag: '🇲🇾',
    fallbackRate: 0.042,
  },
};

export function convertCurrency(amountInBDT, toCurrency, rates = null) {
  const currency = CURRENCIES[toCurrency];
  if (!currency) return amountInBDT;
  const rate = rates?.[toCurrency] || currency.fallbackRate;
  const converted = amountInBDT * rate;
  if (converted >= 1000) return Math.round(converted / 10) * 10;
  if (converted >= 10) return Math.round(converted * 10) / 10;
  return Math.round(converted * 100) / 100;
}

export function formatCurrency(amount, currencyCode) {
  const currency = CURRENCIES[currencyCode];
  if (!currency) return `৳${amount}`;
  return `${currency.symbol}${amount.toLocaleString()}`;
}

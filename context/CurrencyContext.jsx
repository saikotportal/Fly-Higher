'use client';
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { CURRENCIES, convertCurrency, formatCurrency } from '@/data/currencies';

const CurrencyContext = createContext(null);

export function CurrencyProvider({ children }) {
  const [currency, setCurrencyState] = useState('BDT');
  const [rates, setRates] = useState(null);
  const [loadingRates, setLoadingRates] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('travel_currency');
    if (stored && CURRENCIES[stored]) setCurrencyState(stored);
    fetchRates();
  }, []);

  const fetchRates = useCallback(async () => {
    const apiKey = process.env.NEXT_PUBLIC_EXCHANGE_RATE_API_KEY;
    if (!apiKey || apiKey === 'your_exchangerate_api_key_here') return;
    setLoadingRates(true);
    try {
      const res = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/BDT`);
      const data = await res.json();
      if (data.result === 'success') {
        setRates({
          BDT: 1,
          USD: data.conversion_rates.USD,
          EUR: data.conversion_rates.EUR,
          MYR: data.conversion_rates.MYR,
        });
      }
    } catch (_) {
      // use fallback rates
    } finally {
      setLoadingRates(false);
    }
  }, []);

  const setCurrency = (code) => {
    if (!CURRENCIES[code]) return;
    setCurrencyState(code);
    localStorage.setItem('travel_currency', code);
  };

  const convert = (amountInBDT) => convertCurrency(amountInBDT, currency, rates);
  const format = (amountInBDT) => formatCurrency(convert(amountInBDT), currency);
  const currentCurrency = CURRENCIES[currency];

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, convert, format, currentCurrency, rates, loadingRates, CURRENCIES }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export const useCurrency = () => {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error('useCurrency must be used within CurrencyProvider');
  return ctx;
};

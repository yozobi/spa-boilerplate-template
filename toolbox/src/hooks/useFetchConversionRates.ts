import { useEffect, useState, useCallback } from 'react';

export type FetchConversionCurrencies = {
  AUD: number;
  BGN: number;
  BRL: number;
  CAD: number;
  CHF: number;
  CNY: number;
  CZK: number;
  DKK: number;
  EUR: number;
  GBP: number;
  HKD: number;
  HRK: number;
  HUF: number;
  IDR: number;
  ILS: number;
  INR: number;
  ISK: number;
  JPY: number;
  KRW: number;
  MXN: number;
  MYR: number;
  NOK: number;
  NZD: number;
  PHP: number;
  PLN: number;
  RON: number;
  RUB: number;
  SEK: number;
  SGD: number;
  THB: number;
  TRY: number;
  USD: number;
  ZAR: number;
};

interface Conversions {
  // The base currency, by default GBP
  base: keyof FetchConversionCurrencies;
  // yyyy-mm-dd format
  date: string;
  rates: FetchConversionCurrencies;
}

export const fetchConversionRates = async (): Promise<Conversions> => {
  const result: Conversions = await (
    await fetch('https://api.exchangeratesapi.io/latest?base=GBP')
  ).json();
  return result;
};

export type ConvertFunction = (params: {
  base: keyof FetchConversionCurrencies;
  target: keyof FetchConversionCurrencies;
  amount: number;
}) => number | null;

/**
 * Returns a function you can use to calculate the
 * exchange rates between currencies
 */
export const useFetchConversionRates = () => {
  const [data, setData] = useState<Conversions | null>(null);
  const [error, setError] = useState<string>();

  const fetchRates = useCallback(() => {
    try {
      fetchConversionRates().then(setData);
    } catch (e) {
      setError('An unknown error occurred fetching the conversion rates.');
    }
  }, []);

  useEffect(() => {
    fetchRates();
  }, [fetchRates]);

  let state: 'pending' | 'error' | 'success' = 'pending';
  if (error) {
    state = 'error';
  } else if (data) {
    state = 'success';
  }

  const convert: ConvertFunction = ({ base, amount, target }) => {
    if (state !== 'success' || !data) {
      console.error(
        'You cannot convert if useFetchConversionRates has errored or is still loading.',
      );
      return null;
    }
    const baseModifier = data.rates[base];
    const targetModifier = data.rates[target];
    return Number(((amount * targetModifier) / baseModifier).toFixed(2));
  };

  return {
    data,
    error,
    state,
    refetch: fetchRates,
    convert,
  };
};

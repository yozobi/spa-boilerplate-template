import { useEffect, useState, useCallback } from 'react';

type Rates = {
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
  base: keyof Rates;
  // yyyy-mm-dd format
  date: string;
  rates: Rates;
}

export const fetchConversionRates = async (): Promise<Conversions> => {
  const result: Conversions = await (
    await fetch('https://api.exchangeratesapi.io/latest?base=GBP')
  ).json();
  return result;
};

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

  const convert = ({
    base,
    amount,
    target,
  }: {
    base: keyof Rates;
    target: keyof Rates;
    amount: number;
  }): number | null => {
    if (state !== 'success' || !data) {
      console.error(
        'You cannot convert if useFetchConversionRates has errored or is still loading.',
      );
      return null;
    }
    const baseModifier = data.rates[base];
    const targetModifier = data.rates[target];
    return Number((amount * baseModifier * targetModifier).toFixed(2));
  };

  return {
    data,
    error,
    state,
    refetch: fetchRates,
    convert,
  };
};

export const formatCurrency = (
  value: number | string | undefined = '0.00',
  currency?: string,
  opts: {
    minimumFractionDigits?: number;
  } = {
    minimumFractionDigits: 2,
  },
) => {
  if (currency) {
    const formatter = new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: currency || 'GBP',
      currencyDisplay: 'symbol',
      minimumFractionDigits: opts.minimumFractionDigits,
    });
    return formatter.format(Number(value)).replace(/^[a-zA-Z]+/i, '');
  } else {
    const formatter = new Intl.NumberFormat('en-GB');
    return formatter.format(Number(value)).replace(/\D00$/, '');
  }
};

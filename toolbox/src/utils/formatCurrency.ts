export const formatCurrency = (
  value: number | string | undefined = '0.00',
  currency?: string,
) => {
  if (currency) {
    const formatter = new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: currency || 'GBP',
      currencyDisplay: 'symbol',
      minimumFractionDigits: 2,
    });
    return formatter.format(Number(value)).replace(/^[a-zA-Z]+/i, '');
  } else {
    const formatter = new Intl.NumberFormat('en-GB');
    return formatter.format(Number(value)).replace(/\D00$/, '');
  }
};

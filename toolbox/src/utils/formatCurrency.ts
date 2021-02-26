/**
 * Formats a currency using Intl.NumberFormat
 *
 * @deprecated - appears buggy on less well-known currencies
 */
export const formatCurrency = (
  value: number | string | undefined = '0.00',
  currency?: string,
  opts?: {
    minimumFractionDigits?: number | 'zero-or-two';
  },
) => {
  let minimumFractionDigits: number;

  if (opts?.minimumFractionDigits === 'zero-or-two') {
    minimumFractionDigits = Number.isInteger(Number(value)) ? 0 : 2;
  } else {
    minimumFractionDigits = opts?.minimumFractionDigits || 2;
  }

  if (currency) {
    const formatter = new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: currency || 'GBP',
      currencyDisplay: 'symbol',
      minimumFractionDigits,
    });
    return formatter.format(Number(value)).replace(/^[a-zA-Z]+/i, '');
  } else {
    const formatter = new Intl.NumberFormat('en-GB');
    return formatter.format(Number(value)).replace(/\D00$/, '');
  }
};

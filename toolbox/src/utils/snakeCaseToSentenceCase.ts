import upperFirst from 'lodash/upperFirst';

export const snakeCaseToSentenceCase = (s: string | undefined | null) =>
  (s || '')
    .split('_')
    .map(upperFirst)
    .join(' ');

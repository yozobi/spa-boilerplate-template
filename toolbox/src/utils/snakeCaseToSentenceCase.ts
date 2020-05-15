import upperFirst from 'lodash/upperFirst';

export const snakeCaseToSentenceCase = (s: string | undefined) =>
  (s || '')
    .split('_')
    .map(upperFirst)
    .join(' ');

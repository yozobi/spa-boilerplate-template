import { coerceObjectKeys } from '../coerceObjectKeys';

describe('coerceObjectKeys', () => {
  describe('Happy paths', () => {
    it('Should convert all keys to an expected object', () => {
      expect(
        coerceObjectKeys(
          {
            id: /id/i,
            pascalCase: /pascal(_|-| |)case/i,
            sentenceCase: /sentence(_|-| |)case/i,
            camelCase: /camel(_|-| |)case/i,
            snakeCase: /snake(_|-| |)case/i,
          },
          {
            id: null,
            PascalCase: null,
            'Sentence Case': null,
            camelCase: null,
            snake_case: null,
          },
        ),
      ).toEqual({
        id: null,
        pascalCase: null,
        camelCase: null,
        snakeCase: null,
        sentenceCase: null,
      });
    });

    test('That, when confronted with two columns that could both match, takes the first one that matches', () => {
      expect(
        coerceObjectKeys(
          {
            id: /id1|id2/i,
          },
          {
            id1: 1,
            id2: 2,
          },
        ),
      ).toEqual({
        id: 1,
      });
    });
  });
});

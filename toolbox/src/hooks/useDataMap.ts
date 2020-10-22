import { useMemo } from 'react';

/**
 * @deprecated - @mattpocock was being too clever here
 *
 * This makes working with arrays of data significantly easier. Given that
 * the data has an 'id' attribute, it provides you with methods to simply
 * get, set, and delete data without writing complicated array logic.
 *
 * Usage:
 *
 * const [result] = useUsersQuery();
 *
 * const users = useDataMap(result?.data?.Users);
 *
 * const specificUser = users.get('mattpocock');
 */
export const useDataMap = <T extends { id: string }>(
  array: T[] | undefined,
) => {
  const map = useMemo(() => makeMapFromArray(array || []), [array]);

  return map;
};

/**
 * Provides a way of using the dataMap without
 * wrapping it in a hook.
 */
export const makeMapFromArray = <T extends { id: string }>(array: T[]) => {
  const map = new Map<string, T>();

  (array || []).forEach((elem) => map.set(elem.id, elem));

  return {
    /**
     * Get an element of the map by its id.
     */
    getById: (id: string | undefined) => {
      if (!id) return undefined;
      return map.get(id);
    },
    /**
     * Set an element of the map by passing in the element
     */
    set: (value: T) => map.set(value.id, value),
    /**
     * Delete an element of the map by id
     */
    deleteById: (id: string | undefined) => {
      if (id) map.delete(id);
    },
    /**
     * Put the map into an array again, perhaps
     * to feed it into a table or similar.
     */
    toArray: () => Array.from(map.values()) || [],
    /**
     * Check if the map is empty. Functionally the same as
     * checking if array.length === 0
     */
    isEmpty: Array.from(map.values()).length === 0,
  };
};

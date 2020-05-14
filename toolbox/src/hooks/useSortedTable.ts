import { useState } from 'react';

interface UseSortedTableParams<OrderByVariable extends object[]> {
  defaultOrderBy: string;
  defaultAscOrDesc?: AscOrDesc;
  /**
   * This mapping acts as a bridge between react-table and hasura.
   *
   * Each column maps to a Header or id attribute in a react-table column.
   * Pass each column a function, which will return either asc or desc
   * depending on which orderBy is selected.
   * 
   * For example, in JCAP:
   * 
   *  Organisation: (o) => ({
        currencyBook: {
          businessUnit: {
            organisation: {
              name: o,
            },
          },
        },
      }),
   * 
   * This takes the Organisation column id and returns an ordering object
   * which you can pump straight into hasura. The 'o' is either
   * 'asc' or 'desc', but we mark it as any for type convenience.
   */
  mapping: {
    [column: string]: (orderBy: any) => OrderByVariable[0];
  };
}

type AscOrDesc = 'asc' | 'desc';

export interface SortState {
  columnId: string;
  order: 'asc' | 'desc';
}

/**
 * Use this hook to manage server-side sorting with react-table
 * and Hasura.
 */
export const useSortedTable = <OrderByVariable extends object[]>({
  defaultAscOrDesc = 'desc',
  defaultOrderBy,
  mapping,
}: UseSortedTableParams<OrderByVariable>) => {
  const initialState = {
    columnId: defaultOrderBy,
    order: defaultAscOrDesc,
  };
  const [sortingState, setSortingState] = useState<SortState>(initialState);

  return {
    sortingState,
    orderBy: ((mapping[sortingState?.columnId]?.(sortingState?.order) ||
      mapping[sortingState?.columnId]?.(
        sortingState?.order,
      )) as unknown) as OrderByVariable,
    onColumnClick: (columnId?: string) => {
      if (!columnId) {
        return setSortingState(initialState);
      }

      const isOnlyTogglingAscOrDesc = columnId === sortingState.columnId;

      if (isOnlyTogglingAscOrDesc) {
        return setSortingState({
          ...sortingState,
          order: sortingState.order === 'asc' ? 'desc' : 'asc',
        });
      }

      if (mapping[columnId]) {
        setSortingState({ columnId, order: defaultAscOrDesc });
      }
    },
  };
};

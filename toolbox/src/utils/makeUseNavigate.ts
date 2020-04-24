import { useHistory } from 'react-router-dom';

type RoutesType = {
  [name: string]: {
    path: string;
    // Params contained in this path's URL
    params?: {
      [paramName: string]: true;
    };
    search?: {
      // Is this field required or not?
      [paramName: string]: boolean;
    };
  };
};

type RoutesReturn<R extends RoutesType> = {
  [K in keyof R]: (params?: {
    params?: { [PK in keyof R[K]['params']]: string | number };
    search?: { [PK in keyof R[K]['search']]?: string | number };
  }) => string;
};

/**
 * Use this function to create a single source of truth
 * for all routes in your app
 */
export const makeRouteMap = <R extends RoutesType>(
  routes: R,
): RoutesReturn<R> => {
  let obj: Partial<RoutesReturn<R>> = {};
  Object.entries(routes).forEach(([_key, { path }]) => {
    const key: keyof R = _key;

    const func: RoutesReturn<R>[typeof key] = (routeInfo?: {
      params?: {
        [paramName: string]: string | number;
      };
      search?: {
        [paramName: string]: string | number | undefined;
      };
    }) => {
      let newPath = String(path);
      // If params, add the new path to the object
      if (routeInfo?.params) {
        Object.entries(routeInfo?.params || {}).forEach(
          ([paramName, value]) => {
            newPath = newPath.replace(
              new RegExp(':' + paramName),
              String(value),
            );
          },
        );
      }
      if (!routeInfo?.search) {
        return newPath;
      } else {
        return `${newPath}?${new URLSearchParams(
          routeInfo?.search as any,
        ).toString()}`;
      }
    };

    obj[key] = func;
  });
  return obj as RoutesReturn<R>;
};

type UseNavigateReturn<R extends RoutesType> = {
  [K in keyof RoutesReturn<R>]: (
    params?: Parameters<RoutesReturn<R>[K]>[0],
  ) => void;
};

/**
 * Creates a useNavigate hook which you can use to
 * navigate type-safely between all routes in your app
 */
export const makeUseNavigate = <R extends RoutesType>(
  routeMap: RoutesReturn<R>,
) => {
  return (): UseNavigateReturn<R> => {
    const history = useHistory();
    const toReturn: Partial<UseNavigateReturn<R>> = {};
    Object.entries(routeMap).forEach(([_routeName, func]) => {
      const routeName: keyof UseNavigateReturn<R> = _routeName;
      toReturn[routeName] = (params: any) => {
        history.push(routeMap[routeName](params));
      };
    });
    return toReturn as UseNavigateReturn<R>;
  };
};

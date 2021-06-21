import { makeRouteMap } from 'toolbox';
import { useHistory } from 'react-router-dom';
import { makeUseNavigate } from 'toolbox/src/utils/makeUseNavigate';

export const routeMap = makeRouteMap({
  root: {
    path: '/',
  },
});

export const useNavigate = makeUseNavigate(routeMap, useHistory);

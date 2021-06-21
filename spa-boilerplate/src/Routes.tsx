import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { routeMap } from 'routeMap';

const NotFoundPage = React.lazy(() => import('./pages/404'));
const HomePage = React.lazy(() => import('./pages'));

export const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path={routeMap.root()}>
          <HomePage />
        </Route>
        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
    </Router>
  );
};

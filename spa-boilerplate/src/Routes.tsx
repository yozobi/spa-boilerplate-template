import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const NotFoundPage = React.lazy(() => import('./pages/404'));
const HomePage = React.lazy(() => import('./pages'));

export const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
    </Router>
  );
};

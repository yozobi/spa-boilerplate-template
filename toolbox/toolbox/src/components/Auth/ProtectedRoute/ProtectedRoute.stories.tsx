import React, { useState, ChangeEvent } from 'react';
import { ProtectedRoute } from './ProtectedRoute';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from 'react-router-dom';

export default { title: 'ProtectedRoute' };

export const MiniRouterDemo = () => {
  const [shouldIgnoreFailedAuth, setShouldIgnoreFailedAuth] = useState(false);

  return (
    <div className="max-w-2xl p-6">
      <label
        htmlFor="authToggle"
        className={`inline-block mb-5 p-2 rounded ${
          shouldIgnoreFailedAuth ? 'bg-green-200' : 'bg-red-200'
        }`}
      >
        <input
          id="authToggle"
          type="checkbox"
          className="mr-2"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setShouldIgnoreFailedAuth(e.target.checked)
          }
        />
        Authenticated
      </label>
      <Router>
        <nav className="p-3 text-white bg-blue-500 rounded">
          <NavLink to="/" exact className="pl-3" activeClassName="underline">
            Unprotected Route 1
          </NavLink>
          <NavLink to="/page2" className="pl-3" activeClassName="underline">
            Unprotected Route 2
          </NavLink>
          <NavLink to="/protected" className="pl-3" activeClassName="underline">
            Protected Route
          </NavLink>
        </nav>
        <div className="h-64 p-5 mt-5 border rouneed">
          <Switch>
            <Route path="/" exact>
              <p>This is the default page</p>
            </Route>
            <Route path="/page2" exact>
              <p>This page is also visible to unauthenticated users</p>
            </Route>
            <ProtectedRoute
              path="/protected"
              shouldIgnoreFailedAuth={shouldIgnoreFailedAuth}
              exact
            >
              <p>This page should only be visible to authenticated users</p>
            </ProtectedRoute>
          </Switch>
        </div>
      </Router>
    </div>
  );
};

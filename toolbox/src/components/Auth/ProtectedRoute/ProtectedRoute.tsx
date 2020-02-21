import React, { useEffect } from 'react';
import { Route, RouteProps, useHistory } from 'react-router-dom';
import Auth from '@aws-amplify/auth';

interface ProtectedRouteProps extends RouteProps {
  redirectPath?: string; // redirect to this route used if checkAuthState fails
  shouldIgnoreFailedAuth?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  redirectPath = '/',
  shouldIgnoreFailedAuth = false,
  ...routeProps
}) => {
  const history = useHistory();

  async function checkAuthState() {
    try {
      await Auth.currentAuthenticatedUser();
    } catch (err) {
      history.push(redirectPath);
    }
  }

  useEffect(() => {
    !shouldIgnoreFailedAuth && checkAuthState();
  });

  return <Route {...routeProps}>{children}</Route>;
};

export default ProtectedRoute;

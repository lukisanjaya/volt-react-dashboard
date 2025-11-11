import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Routes } from '../routes';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = () => {
    return localStorage.getItem('accessToken') !== null;
  };

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect to={Routes.Login.path} />
        )
      }
    />
  );
};

export default ProtectedRoute;
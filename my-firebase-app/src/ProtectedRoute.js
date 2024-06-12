import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { auth } from './firebase';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = !!auth.currentUser;

  return (
    <Route
      {...rest}
      element={isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" />}
    />
  );
};

export default ProtectedRoute;

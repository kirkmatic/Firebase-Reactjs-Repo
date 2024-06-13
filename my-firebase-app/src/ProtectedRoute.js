import React from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from './firebase';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!auth.currentUser;

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;

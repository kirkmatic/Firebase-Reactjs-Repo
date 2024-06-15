import React from 'react';
import { Navigate } from 'react-router-dom';
import { auth, db } from './Firebase';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!auth.currentUser;

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;

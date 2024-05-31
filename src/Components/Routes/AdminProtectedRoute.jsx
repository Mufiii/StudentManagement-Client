import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('authToken');
  return token ? <Navigate to="/" replace /> : children;
};

export default AdminProtectedRoute;

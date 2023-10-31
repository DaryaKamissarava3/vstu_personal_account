import React from 'react';
import {useAuth} from './auth';
import {Navigate, useLocation} from 'react-router-dom';

export const RequireAuth = ({children}) => {
  const auth = useAuth();
  const location = useLocation();

  const userToken = localStorage.getItem('userToken');

  if (!auth.user && !userToken) {
    return <Navigate to="/login" state={{path: location.pathname}}/>
  }

  return children;
};

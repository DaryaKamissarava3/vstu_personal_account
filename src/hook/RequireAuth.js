import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './auth';

export const RequireAuth = ({children}) => {
  const {user} = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  const userRoles = useSelector((state) => state.auth.roles);
  console.log(userRoles);

  const userToken = localStorage.getItem('userToken');

  useEffect(() => {
    if (userRoles !== null) {
      const stateRole = userRoles.includes('USER') ? 1 : 0;
      if (stateRole === 0) {
        navigate('/');
      } else if (stateRole === 1) {
        navigate('/teacher-profile');
      }
    }
  }, [navigate, userRoles]);

  if (!user && !userToken) {
    return <Navigate to="/login" state={{path: location.pathname}}/>
  }

  return children;
};

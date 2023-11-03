import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useNavigate, Navigate,Outlet} from 'react-router-dom';

export const PrivateRoutes = () => {
  const userRoles = useSelector((state) => state.auth.roles);
  const userToken = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (userRoles !== null) {
      const stateRole = userRoles.includes('USER') ? 1 : 0;
      if (stateRole === 0) {
        navigate('/')
      } else if (stateRole === 1) {
        navigate('/teacher');
      }
    }
  }, [])


  if (!userToken) {
    return <Navigate to="/login"/>
  }

  return <Outlet />;
};

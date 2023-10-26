import React from 'react';
import {useSelector} from 'react-redux';
import {NavLink, Outlet} from 'react-router-dom';

export const ProtectedRoute = () => {
  const {userInfo} = useSelector((state) => state.auth);
  if (!userInfo) {
    return (
      <div className="unauthorized">
        <h2>Неавторизован</h2>
        <div>
          <NavLink to="/login">Войти</NavLink>
          чтобы получить доступ к сайту
        </div>
      </div>
    );
  }

  return <Outlet/>
};

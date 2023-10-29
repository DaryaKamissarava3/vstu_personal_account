import React from 'react';
import {useSelector} from 'react-redux';
import {NavLink,Outlet} from 'react-router-dom';

export const ProtectedRoute = () => {
  const {userInfo}=useSelector((state)=>state.auth);

  if(!userInfo){
    return(
      <div className="unauthorized">
        <h1>Вы не авторизованы!</h1>
        <div>
          <NavLink to="/login">Авторизуйтесь, чтобы продолжить</NavLink>
        </div>
      </div>
    )
  }else{
    return <Outlet />
  }


};

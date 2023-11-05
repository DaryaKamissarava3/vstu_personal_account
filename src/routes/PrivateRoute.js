import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {Outlet, Navigate, useLocation, Route, useNavigate} from "react-router-dom";


export const PrivateRoute = ({ children, isAuthenticated }) => {
  return isAuthenticated ? children : <Navigate to='/login' />
};

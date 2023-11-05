import React, {useEffect} from 'react';
import {StudentRoutes} from "./StudentRoutes";
import {TeacherRoutes} from "./TeacherRoutes";
import {Navigate, Outlet, useLocation} from "react-router-dom";
import {Profile} from "../Pages/Profile";

export const AuthenticatedRoutes = ({  isAuthenticated ,roles }) => {
  console.log('AuthenticatedRoutes', roles)


  if(isAuthenticated){
    const stateRole=roles.includes('USER')?1:0;
    if(stateRole===0){
      return (
        <>

          <Outlet />
        </>
      )
    }else if(stateRole===1){
      return (
        <>

          <Outlet />
        </>
      )
    }
  }
};

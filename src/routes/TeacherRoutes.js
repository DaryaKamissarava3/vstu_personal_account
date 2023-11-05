import React from 'react';
import {Navigate, Outlet, useLocation} from "react-router-dom";
import {Routes, Route} from 'react-router-dom';
import {TeacherProfile} from "../Pages/TeacherProfile";
import {StudentRoutes} from "./StudentRoutes";

export const TeacherRoutes = ({isAuthenticated, roleNumber}) => {
  console.log('teacher',roleNumber)

  if (isAuthenticated) {
    return (
      <>
        <Outlet />
      </>
    );
  }

};

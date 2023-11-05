import React from 'react';
import {useLocation, Navigate, Outlet} from "react-router-dom";

export const StudentRoutes = ({isAuthenticated,roleNumber}) => {
  console.log('student',roleNumber)

  if (isAuthenticated) {
    return (
      <>
        <Outlet />
      </>
    );
  }
};

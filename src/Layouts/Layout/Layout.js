import React from 'react';
import { Outlet} from 'react-router-dom';

import { Header } from '../../components/Header';
import { SideBar } from '../../components/Sidebar';

export const Layout = ({children , role}) => {
  return (
    <div className="container">
      <SideBar userRole={role}/>
      <div className="content-container">
        <Header/>
        <main className="content">
          {children}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

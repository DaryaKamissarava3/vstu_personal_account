import React from 'react';

import { Header } from '../../components/Header';
import { SideBar } from '../../components/SideBar';

export const Layout = ({children}) => {
  return (
    <div className="container">
      <SideBar/>
      <div className="content-container">
        <Header/>
        <main className="content">
          {children}
        </main>
      </div>
    </div>
  );
};

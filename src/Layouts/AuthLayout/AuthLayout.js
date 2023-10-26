import React from 'react';

import {AuthHeader} from '../../components/Header/AuthHeader';
import {Footer} from '../../components/Footer';

export const AuthLayout = ({children}) => {
  return (
    <div className="container">
      <div className="content-container">
        <AuthHeader />
        <main className="content">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

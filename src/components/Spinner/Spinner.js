import React from 'react';

import './style.css';

export const Spinner = () => {
  return (
    <div className="spinner-block">
      <h2 className="spinner-text">Идёт загрузка</h2>
      <span className="spinner"></span>
    </div>
  );
};

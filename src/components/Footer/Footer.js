import React from 'react';

import './style.css';
import {Link} from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="footer">
      <div>
        Copyright © 2022 | Все права защищены, Поддержка веб-сервиса
        <Link to="/" className="footer-link">
          cit.vstu.by
        </Link>
      </div>
    </footer>
  );
};

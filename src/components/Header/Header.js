import React from 'react';

import searchIcon from './../../assets/images/headerIcons/searchIcon.svg';
import eyeIcon from './../../assets/images/headerIcons/Eye.svg';
import bellIcon from './../../assets/images/headerIcons/Bell.svg';
import avatarIcon from './../../assets/images/headerIcons/img-human.svg';
import './style.css';
import {useSelector} from "react-redux";

export const Header = () => {
  const userName=useSelector((state)=>state.auth.userInfo.fio)

  return (
    <header className="header">
      <div className="header-search-input">
        <input className="search_input" type="text" placeholder="Поиск по сайту..."/>
        <img className="search-input_icon" src={searchIcon} alt="loop icon"/>
      </div>
      <div className="header-block">
        <img className="header-icon" src={eyeIcon} alt="icon"/>
        <img className="header-icon" src={bellIcon} alt="icon"/>
        <img className="header-profile_img" src={avatarIcon} alt="Avatar icon"/>
        <div className="header-block-profile">
          <p>{userName}</p>
          <p>abazovskaya@mail.ru</p>
        </div>
      </div>
    </header>
  );
};

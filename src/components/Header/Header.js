import React from 'react';

import searchIcon from './../../assets/images/headerIcons/searchIcon.svg';
import eyeIcon from './../../assets/images/headerIcons/Eye.svg';
import bellIcon from './../../assets/images/headerIcons/Bell.svg';
import avatarIcon from './../../assets/images/headerIcons/img-human.svg';
import open from './../../assets/images/headerIcons/open.svg';
import './style.css';
import {useSelector} from "react-redux";
import {shortenName} from "../../assets/utils/functions";
import personIcon from "../../assets/images/vector.svg";

export const Header = () => {
  const userName=useSelector((state)=>state.auth.userInfo.fio)

  return (
    <header className="header">
      <div className="header-title">
        <img className="header_img" src={personIcon} alt="Person icon"/>
        <p>Личный кабинет студента УО "ВГТУ"</p>
      </div>
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
        <button className="menu-btn">
          <img  src={open} alt="Open btn"/>
        </button>
      </div>
    </header>
  );
};

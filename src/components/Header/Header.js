import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';

import { Search } from '../Search';
import { HeaderTitle } from './HeaderTitle';

import eyeIcon from './../../assets/images/headerIcons/Eye.svg';
import bellIcon from './../../assets/images/headerIcons/Bell.svg';
import avatarIcon from './../../assets/images/headerIcons/img-human.svg';
import open from './../../assets/images/headerIcons/open.svg';
import './style.css';

export const Header = () => {
  const userName = useSelector((state) => state.auth.userInfo.fio)

  useEffect(()=>{

  })

  return (
    <header className="header">
      <HeaderTitle
        blockName="header-block-title"
        logoImg="header-logo"
        titleText="header-text"
      />
      <Search
        blockClass="header-search-block"
        inputClass="header-search_input"
        iconClass="header-search_icon"
      />
      <div className="header-block">
        <img className="header-icon" src={eyeIcon} alt="icon"/>
        <img className="header-icon" src={bellIcon} alt="icon"/>
        <img className="header-profile_img" src={avatarIcon} alt="Avatar icon"/>
        <div className="header-block-profile">
          <p>{userName}</p>
          <p>abazovskaya@mail.ru</p>
        </div>
        <button className="menu-btn">
          <img src={open} alt="Open btn"/>
        </button>
      </div>
    </header>
  );
};

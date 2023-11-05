import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../store/authSlice';
import { persistor } from '../../store';

import { HeaderTitle } from '../Header/HeaderTitle';
import { SidebarButton } from '../SidebarButton';

import userIcon from './../../assets/images/buttonIcons/User.svg';
import calendarIcon from './../../assets/images/buttonIcons/Calendar.svg';
import statisticIcon from './../../assets/images/buttonIcons/Chart.svg';
import attendanceIcon from './../../assets/images/buttonIcons/Component.svg';
import debtsIcon from './../../assets/images/buttonIcons/Receipt.svg';
import userManualIcon from './../../assets/images/buttonIcons/InfoSquare.svg';
import logoutIcon from './../../assets/images/buttonIcons/Logout.svg';

import './style.css';

export const SideBar = ({userRole}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();


  const handleLogout = () => {
    dispatch(logoutUser());
    persistor.purge();
    navigate("/login");
  };

  return (
    <section className="sidebar_container">
      <HeaderTitle blockName="sidebar-block-title" logoImg="sidebar-logo"/>
      {userRole === 0 ?
        <div className="sidebar-buttons-block">
          <SidebarButton to="/" icon={userIcon} text="Мой профиль" isActive={location.pathname === '/'}/>
          <SidebarButton to="/schedule" icon={calendarIcon} text="Расписание"
                         isActive={location.pathname === '/schedule'}/>
          <SidebarButton to="/statistic" icon={statisticIcon} text="Статистика"
                         isActive={location.pathname === '/statistic'}/>
          <SidebarButton to="/attendance" icon={attendanceIcon} text="Посещения занятий"
                         isActive={location.pathname === '/attendance'}/>
          <SidebarButton to="/debts" icon={debtsIcon} text="Задолжности" isActive={location.pathname === '/debts'}/>
          <div className="dividing_line"></div>
          <SidebarButton to="/manual" icon={userManualIcon} text="Руководство пользователя"
                         isActive={location.pathname === '/manual'}/>
          <button onClick={handleLogout} className="sidebar-button">
            <div className="button-content">
              <img src={logoutIcon} alt="Button icon" className="button_icon"/>
              <span className="button_text">Выйти из профиля</span>
            </div>
          </button>
        </div>
        :
        <div className="sidebar-buttons-block">
          <SidebarButton to="/" icon={userIcon} text="Мой профиль" isActive={location.pathname === '/'}/>
          <SidebarButton to="/schedule" icon={calendarIcon} text="Расписание"
                         isActive={location.pathname === '/schedule'}/>
          <div className="dividing_line"></div>
          <SidebarButton to="/manual" icon={userManualIcon} text="Руководство пользователя"
                         isActive={location.pathname === '/manual'}/>
          <button onClick={handleLogout} className="sidebar-button">
            <div className="button-content">
              <img src={logoutIcon} alt="Button icon" className="button_icon"/>
              <span className="button_text">Выйти из профиля</span>
            </div>
          </button>
        </div>
      }
    </section>
  );
};

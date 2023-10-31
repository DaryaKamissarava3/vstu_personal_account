import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../hook/auth';
import { logoutUser } from '../../store/authSlice';
import { persistor } from '../../store';

import personIcon from './../../assets/images/vector.svg';
import userIcon from './../../assets/images/buttonIcons/User.svg';
import calendarIcon from './../../assets/images/buttonIcons/Calendar.svg';
import statisticIcon from './../../assets/images/buttonIcons/Chart.svg';
import attendanceIcon from './../../assets/images/buttonIcons/Component.svg';
import debtsIcon from './../../assets/images/buttonIcons/Receipt.svg';
import userManualIcon from './../../assets/images/buttonIcons/InfoSquare.svg';
import logoutIcon from './../../assets/images/buttonIcons/Logout.svg';

import './style.css';

export const SideBar = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const auth = useAuth();

  const handleLogout = () => {
    dispatch(logoutUser());
    persistor.purge();
    auth.logout();
    navigate("/login");
    localStorage.clear();
  };

  return (
    <section className="sidebar_container">
      <div className="logo-block">
        <img className="logo-block_img" src={personIcon} alt="Person icon"/>
        <p>Личный кабинет студента УО "ВГТУ"</p>
      </div>
      <div className="sidebar-buttons-block">
        <Link to="/" className="sidebar-button">
          <div className="button-content">
            <img src={userIcon} alt="Button icon" className="button_icon"/>
            <span className="button_text">Мой профиль</span>
          </div>
        </Link>
        <Link to="/schedule" className="sidebar-button">
          <div className="button-content">
            <img src={calendarIcon} alt="Button icon" className="button_icon"/>
            <span className="button_text">Расписание</span>
          </div>
        </Link>
        <Link to="/statistic" className="sidebar-button">
          <div className="button-content">
            <img src={statisticIcon} alt="Button icon" className="button_icon"/>
            <span className="button_text">Статистика</span>
          </div>
        </Link>
        <Link to="/attendance" className="sidebar-button">
          <div className="button-content">
            <img src={attendanceIcon} alt="Button icon" className="button_icon"/>
            <span className="button_text">Посещения занятий</span>
          </div>
        </Link>
        <Link to="/debts" className="sidebar-button">
          <div className="button-content">
            <img src={debtsIcon} alt="Button icon" className="button_icon"/>
            <span className="button_text">Задолжности</span>
          </div>
        </Link>
        <div className="dividing_line"></div>
        <Link to="/manual" className="sidebar-button">
          <div className="button-content">
            <img src={userManualIcon} alt="Button icon" className="button_icon"/>
            <span className="button_text">Руководство пользователя</span>
          </div>
        </Link>
        <button onClick={handleLogout} className="sidebar-button">
          <div className="button-content">
            <img src={logoutIcon} alt="Button icon" className="button_icon"/>
            <span className="button_text">Выйти из профиля</span>
          </div>
        </button>
      </div>
    </section>
  );
};

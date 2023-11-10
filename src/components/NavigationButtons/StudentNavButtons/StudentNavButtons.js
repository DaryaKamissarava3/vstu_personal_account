import React from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { NavigationButton } from '../NavigationButton';

import userIcon from '../../../assets/images/buttonIcons/User.svg';
import calendarIcon from '../../../assets/images/buttonIcons/Calendar.svg';
import statisticIcon from '../../../assets/images/buttonIcons/Chart.svg';
import attendanceIcon from '../../../assets/images/buttonIcons/Component.svg';
import debtsIcon from '../../../assets/images/buttonIcons/Receipt.svg';
import userManualIcon from '../../../assets/images/buttonIcons/InfoSquare.svg';
import logoutIcon from '../../../assets/images/buttonIcons/Logout.svg';

import { logoutUser } from '../../../store/authSlice';
import { clearStudentInfo } from '../../../store/studentSlice';
import { clearSchedule } from '../../../store/scheduleSlice';
import { persistor } from '../../../store';

export const StudentNavButtons = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(clearStudentInfo());
    dispatch(clearSchedule());
    persistor.purge();
    navigate("/login");
  };

  return (
    <>
      <NavigationButton to="/" icon={userIcon} text="Мой профиль" isActive={location.pathname === '/'}/>
      <NavigationButton to="/schedule" icon={calendarIcon} text="Расписание"
                        isActive={location.pathname === '/schedule'}/>
      <NavigationButton to="/statistic" icon={statisticIcon} text="Статистика"
                        isActive={location.pathname === '/statistic'}/>
      <NavigationButton to="/attendance" icon={attendanceIcon} text="Посещения занятий"
                        isActive={location.pathname === '/attendance'}/>
      <NavigationButton to="/debts" icon={debtsIcon} text="Задолжности" isActive={location.pathname === '/debts'}/>
      <div className="dividing_line"></div>
      <NavigationButton to="/manual" icon={userManualIcon} text="Руководство пользователя"
                        isActive={location.pathname === '/manual'}/>
      <button onClick={handleLogout} className="sidebar-button">
        <div className="button-content">
          <img src={logoutIcon} alt="Button icon" className="button_icon"/>
          <span className="button_text">Выйти из профиля</span>
        </div>
      </button>
    </>
  );
};

import React from 'react';

import {HeaderTitle} from '../Header/HeaderTitle';
import {StudentNavButtons} from '../NavigationButtons/StudentNavButtons';
import {TeacherNavButtons} from '../NavigationButtons/TeacherNavButtons';

import './style.css';

export const SideBar = ({userRole}) => {

  return (
    <section className="sidebar_container">
      <HeaderTitle blockName="sidebar-block-title" logoImg="sidebar-logo"/>
      {userRole === 0 ?
        <div className="sidebar-buttons-block">
          <StudentNavButtons/>
        </div>
        :
        <div className="sidebar-buttons-block">
          <TeacherNavButtons/>
        </div>
      }
    </section>
  );
};

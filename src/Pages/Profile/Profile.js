import React from 'react';
import {Link} from 'react-router-dom';

import {Layout} from '../../Layouts/Layout';

import personPhoto from './../../assets/images/personPhoto.svg';
import penIcon from '../../assets/images/profileIcons/penIcon.svg';
import lockout from '../../assets/images/profileIcons/Lock-open.svg';
import achievement1 from '../../assets/images/profileIcons/achievement1.svg';
import achievement2 from '../../assets/images/profileIcons/achievement2.svg';
import achievement3 from '../../assets/images/profileIcons/achievement3.svg';

import './style.css';
import {useSelector} from "react-redux";
import {Search} from '../../components/Search';

export const Profile = () => {
  const userName = useSelector((state) => state.auth.userInfo.fio);

  return (
    <Layout>
      <div className="profile-block">
        <Search
          blockClass="profile-search-block"
          inputClass="profile-search_input"
          iconClass="profile-search_icon"
        />
        <div className="profile-block_container">
          <div className="person-information">
            <img className="person-photo" src={personPhoto} alt="Person photo"/>
            <p className="person-name">
              {userName}
            </p>
            <Link to="/edit-profile" className="sidebar-button">
              <div className="button-content">
                <img src={penIcon} alt="Button icon" className="button_icon"/>
                <span className="button_text">Редактировать профиль</span>
              </div>
            </Link>
            <Link to="/edit-profile" className="sidebar-button">
              <div className="button-content">
                <img src={lockout} alt="Button icon" className="button_icon"/>
                <span className="button_text">Пункт меню</span>
              </div>
            </Link>
            <Link to="/edit-profile" className="sidebar-button">
              <div className="button-content">
                <img src={lockout} alt="Button icon" className="button_icon"/>
                <span className="button_text">Пункт меню</span>
              </div>
            </Link>
          </div>
          <div className="profile-block-item">
            <div className="block-greeting">
              <div className="block-greeting_item">
                <h2>Здраствуйте, {userName}!</h2>
                <p>Сегодня - Понедельник, 28 августа 2022</p>
              </div>
              <div className="block-greeting_item">
                <img className="achievement-icon" src={achievement1} alt="Achievement icon"/>
                <img className="achievement-icon" src={achievement2} alt="Achievement icon"/>
                <img className="achievement-icon" src={achievement3} alt="Achievement icon"/>
              </div>
            </div>
            <div className="notification-block">
              <div className="notification-block-item">
                <p>Уведомления</p>
                <p className="show-all-btn">Посмотреть все</p>
              </div>
              <div className="notification-block-item">
                <h4>Admin, 28.08.22</h4>
                <p>Таким образом, современная методология разработки способствует повышению качества новых предложений.
                  Предварительные выводы неутешительны: семантический.</p>
              </div>
              <div className="notification-block-item">
                <h4>System, 28.08.22</h4>
                <p>Таким образом, современная методология разработки способствует повышению качества новых предложений.
                  Предварительные выводы неутешительны: семантический.</p>
              </div>
              <div className="notification-block-item">
                <h4>System, 28.08.22</h4>
                <p>Таким образом, современная методология разработки способствует повышению ...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

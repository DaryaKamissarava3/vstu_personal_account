import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation, useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';

import {AuthLayout} from '../../Layouts/AuthLayout';
import {Spinner} from '../../components/Spinner';

import {userLogin} from '../../store/authSlice';

import './style.css';
import {ErrorModal} from "../../components/ErrorMessage/ErrorModal";
import {useAuth} from "../../hook/auth";


export const Login = () => {
  const {register, handleSubmit, reset} = useForm();

  const {loading, userInfo, error} = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location=useLocation();
  const auth = useAuth();

  const redirectPath=location.state?.path || '/';

  const onSubmit = (data) => {
    dispatch(userLogin(data));
    reset();
    if (userInfo) {
      auth.login(data);
      navigate(redirectPath, {replace: true})
    }
  }

  return (
    <AuthLayout>
      <div className="login-container">
        <div className="login-block">
          <h3 className="login-form_title">
            Вход в личный кабинет
          </h3>
          <form onSubmit={handleSubmit(onSubmit)} className="login-form">
            <input
              className="login-input"
              placeholder="Ваш логин"
              {...register("username")}
              required
            />
            <input
              type="password"
              className="login-input"
              placeholder="Ваш пароль"
              {...register("password")}
              required
            />
            <button className="login-btn" type="submit" disabled={loading}>
              {loading ? <Spinner type="circle"/> : 'Войти'}
            </button>
          </form>
        </div>
        {error && <ErrorModal error="Неверный логин или пароль,попробуйте заново"/>}
      </div>
    </AuthLayout>
  );
};

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { AuthLayout } from '../../Layouts/AuthLayout';
import { ErrorMessage } from '../../components/ErrorMessage';
import { Spinner } from '../../components/Spinner';

import { userLogin } from '../../store/authSlice';

import './style.css';

export const Login = () => {
  const {register, handleSubmit} = useForm();

  const {loading, userInfo, error} = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (userInfo) {
  //     navigate('/')//nav authenticated user to main page
  //   }
  // }, [navigate, userInfo]);

  const onSubmit = (data) => {
    //TODO auth actions
    console.log(data.login);

    dispatch(userLogin(data))
  }
  console.log(error)
  return (
    <AuthLayout>
      <div className="login-container">
        <div className="login-block">
          <h3 className="login-form_title">
            Вход в личный кабинет
          </h3>
          <form onSubmit={handleSubmit(onSubmit)} className="login-form">
            {/*{error && <ErrorMessage error={error}/> }*/}
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
      </div>
    </AuthLayout>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';
import InputEmail from '../components/login/InputEmail';
import InputPassword from '../components/login/InputPassword';
import ClickLogin from '../components/login/ClickLogin';

function goToRegister() {
  return (
    <Link to="/register">
      <button type="button" data-testid="no-account-btn">
        Ainda não tenho conta
      </button>
    </Link>
  );
}

function Login() {
  return (
    <div className="login-page" data-testid="">
      <InputEmail />
      <InputPassword />
      <ClickLogin />
      {goToRegister()}
    </div>
  );
}

export default Login;

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import TryBeerContext from '../context/TryBeerContext';
import { fetchLogin } from '../services/ApiTrybeer';
import '../style/Login.css';

const logo = require('../logo.jpg');

const RegEx = /\S+@\S+\.\S+/;
const passwordLength = 6;

const handleLogin = (result, history) => {
  localStorage.setItem('user', JSON.stringify(result));
  return result.user.role === 'administrator'
    ? history.push('/admin/orders')
    : history.push('/products');
};

const emailLogin = (setEmail) => (
  <label htmlFor="email-input" className="login-container">
    Email
    <input
      className="input lesserMargin"
      data-testid="email-input"
      type="email"
      placeholder="Email"
      onChange={ (event) => setEmail(event.target.value) }
    />
  </label>
);

const passwordLogin = (setPassword) => (
  <label htmlFor="password-input" className="login-container">
    Senha
    <input
      className="input lesserMargin"
      data-testid="password-input"
      type="password"
      placeholder="Senha"
      onChange={ (event) => setPassword(event.target.value) }
    />
  </label>
);

const buttonSignIn = (email, validEmail, password, history) => (
  <button
    className="button margin-top green"
    data-testid="signin-btn"
    type="button"
    disabled={ !validEmail || password.length < passwordLength }
    onClick={ () => fetchLogin(email, password)
      .then((result) => handleLogin(result, history)) }
  >
    ENTRAR
  </button>
);

const buttonRegister = () => (
  <Link to="/register">
    <button
      className="button margin-top brown"
      data-testid="no-account-btn"
      type="button"
    >
      Ainda não tenho conta
    </button>
  </Link>
);

const privacyPolicy = () => (
  <div className="footer">
    <p>
      Termos de uso Política de privacidade
      © 2021 TryBeer - Todos os direitos reservados.
    </p>
  </div>
);

const logoTrybeer = () => (
  <div className="containerA">
    <img src={ logo } alt="garrafamóvel" className="logo" />
  </div>
);

const Login = ({ history }) => {
  const { email, setEmail, password, setPassword } = useContext(TryBeerContext);
  const validEmail = RegEx.test(String(email).toLowerCase());

  return (
    <div className="container">
      {logoTrybeer()}
      <form className="login-container">
        <div className="containerA">
          <span className="login-container title">TryBeer</span>
          {emailLogin(setEmail)}
          {passwordLogin(setPassword)}
          {buttonSignIn(email, validEmail, password, history)}
          {buttonRegister()}
        </div>
      </form>
      {privacyPolicy()}
    </div>
  );
};

Login.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
};

export default Login;

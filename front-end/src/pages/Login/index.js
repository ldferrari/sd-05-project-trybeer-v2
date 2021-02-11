import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// import { Redirect } from 'react-router-dom';
import './index.css';
import logo from '../../images/uaiWhite.png';
import { postLogin } from '../../services/requestAPI';
// trocar por controler de login

const saveToken = (token) => localStorage.setItem('token', token);

const timeAlert = 3500;
function handleSubmitFunction({ props, email, password, setValidEmail, setAlertLogin }) {
  return async (e) => {
    e.preventDefault();
    try {
      const { token, role } = await postLogin({ email, password });
      saveToken(token);
      if (role === 'administrator') { return props.history.push('/admin/orders'); }
      if (role === 'client') { return props.history.push('/products'); }
      setValidEmail(true);
      return setValidEmail(false);
    } catch (error) {
      console.log(error);
      setAlertLogin('Email e/ou password incorretos');
      setTimeout(() => { setAlertLogin(''); }, timeAlert);
      return false;
    }
  };
}

function validations(setValidEmail, setValidPassword) {
  const validationEmail = (value) => (/[A-Za-z0-9]+@[A-Za-z]+[A-z]*(\.\w{2,3})+/
    .test(value)
    ? setValidEmail(true)
    : setValidEmail(false));

  const validationPassword = (value) => {
    const minLength = 6;
    return (value.length >= minLength ? setValidPassword(true) : setValidPassword(false));
  };
  return { validationEmail, validationPassword };
}

function InputName(email, setEmail) {
  return (
    <fieldset className="noDecor">
      <label htmlFor="email">
        Email:
        <input
          type="email"
          name="email"
          className="inputLogin"
          onChange={ ({ target: { value } }) => setEmail(value) }
          data-testid="email-input"
          value={ email }
        />
      </label>
    </fieldset>
  );
}

function InputPassword(password, setPassword) {
  return (
    <fieldset className="noDecor">
      <label htmlFor="password">
        Senha:
        <input
          type="password"
          name="password"
          className="inputLogin"
          onChange={ ({ target: { value } }) => setPassword(value) }
          data-testid="password-input"
          value={ password }
        />
      </label>
    </fieldset>
  );
}
function InputButtonSingIn() {
  return (
    <button data-testid="no-account-btn" type="button" className="semConta">
      <Link to="/register" className="semConta">
        Ainda não tenho conta
      </Link>
    </button>
  );
}
function InputButtonLogIn(validEmail, validPassword, handleSubmit) {
  return (
    <button
      type="submit"
      disabled={ !(validEmail && validPassword) }
      onClick={ handleSubmit }
      className={ validEmail && validPassword ? 'loginBtn' : '' }
      data-testid="signin-btn"
    >
      ENTRAR
    </button>
  );
}

function Render1(param) {
  const { email, setEmail, password, setPassword } = param;
  const { alertLogin, validEmail, validPassword, handleSubmit } = param;
  return (
    <div className="loginpage">
      <img src={ logo } className="logo" alt="logo" />
      <form className="column-login">
        {InputName(email, setEmail)}
        {InputPassword(password, setPassword)}
        <span className="email-alert">{alertLogin}</span>
        {InputButtonSingIn()}
        {InputButtonLogIn(validEmail, validPassword, handleSubmit)}
      </form>
      {/* <Footer /> */}
    </div>
  );
}
const Login = (props) => {
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertLogin, setAlertLogin] = useState('');
  const { validationEmail, validationPassword } = validations(
    setValidEmail, setValidPassword,
  );
  const obj1 = { props, email, password, setValidEmail, setAlertLogin };
  useEffect(() => { validationEmail(email); }, [email]);
  useEffect(() => { validationPassword(password); }, [password]);
  const handleSubmit = handleSubmitFunction({ ...obj1 });
  const obj2 = { email, setEmail, password, setPassword, alertLogin };
  const obj3 = { validEmail, validPassword, handleSubmit };
  return Render1({ ...obj2, ...obj3 });
};

export default Login;

Login.propTypes = { history: PropTypes.instanceOf(Object).isRequired };

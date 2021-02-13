import React, { useState, useEffect, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import validateLogin from '../services/validateLogin';
import { checkUser } from '../services/api';
import Context from '../context/Context';
import './css/login.css';
import logo from '../images/logo.png';
import Input from '../components/Input';
import { iEmail, iPassword } from '../components/data/loginData.json';

const handleRoute = async (ema, pass, setDesignetedRoute, setUserName) => {
  const userRole = await checkUser(ema, pass);
  if (userRole) {
    localStorage.setItem('role', userRole.role);
    localStorage.setItem('token', userRole.token);
    localStorage.setItem('email', ema);
    localStorage.setItem('cart', JSON.stringify([]));
    setUserName(userRole.name);
  }
  switch (userRole.role) {
  case 'client':
    setDesignetedRoute('/products');
    break;
  case 'administrator':
    setDesignetedRoute('/admin/orders');
    break;
  default:
    break;
  }
};
const Login = () => {
  const { password, setUserName, userEmail } = useContext(Context);
  const [isLoginValid, setIsLoginValid] = useState(false);
  const [designatedRoute, setDesignetedRoute] = useState(undefined);

  useEffect(() => {
    setIsLoginValid(validateLogin(userEmail, password));
  }, [userEmail, password]);

  return (
    <div className="login">
      <div className="input-data">
        <Input i={ iEmail } />
        <Input i={ iPassword } />
        <div className="buttons">
          <button
            type="submit"
            data-testid="signin-btn"
            className="btn-login"
            onClick={ () => handleRoute(userEmail, password, setDesignetedRoute, setUserName) }
          >
            ENTRAR
          </button>
          {designatedRoute !== undefined ? (
            <Redirect to={ designatedRoute } />
          ) : null}
          <button
            type="submit"
            data-testid="no-account-btn"
            className="btn-register"
          >
            <Link to="/register">Ainda não tenho conta</Link>
          </button>
        </div>
      </div>
      <img src={ logo } alt="logo" className="logo" />
    </div>
  );
};

export default Login;

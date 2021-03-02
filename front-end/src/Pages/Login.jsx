import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import M from 'materialize-css';
import Input from '../Components/Input';
import helper from '../Helper';

const pageStyle = {
  justifyContent: 'center',
};

const containerStyle = {
  justifyContent: 'space-between',
  height: '250px',
};

const Login = ({ socket }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [isDisabled, isSetDisabled] = useState(true);
  const [register, setRegister] = useState(false);
  const [userData, setUserData] = useState(helper.getUserData());

  function validaInput(xEmail, xSenha) {
    const regexEmail = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;
    const regexSenha = /^[^W_]{6,100}$/;
    if (regexEmail.test(xEmail) && regexSenha.test(xSenha)) {
      isSetDisabled(false);
    } else {
      isSetDisabled(true);
    }
  }

  useEffect(() => {
    validaInput(email, password);
  }, [email, password]);

  if (register) return <Redirect to="/register" />;
  if (userData) {
    if (userData.role === 'client') return <Redirect to="/products" />;
    if (userData.role === 'administrator') return <Redirect to="/admin/orders" />;
  }
  return (
    <div className="container-main" style={ pageStyle }>
      <div className="container-screen" style={ containerStyle }>
        <div className="card">
          <Input
            test="email-input"
            label="Email"
            type="email"
            id="input_email"
            onChange={ (e) => setEmail(e.target.value) }
          />
          <Input
            test="password-input"
            label="Senha"
            type="password"
            id="input_password"
            onChange={ (e) => setPassword(e.target.value) }
          />
          <div style={ { display: 'flex', flexDirection: 'column' } }>
            <button
              className="btn btn-large yellow-main-bg"
              disabled={ isDisabled }
              data-testid="signin-btn"
              type="submit"
              onClick={ async () => {
                const res = await helper.loginUser({ email, password });
                if (!res.error) {
                  setUserData(res.user.user);
                  socket.emit('init_user', res ? res.user.token : undefined);
                }
                M.toast({
                  html: '<p>Email ou senha incorretos!</p>',
                  classes: 'orange-bg',
                });
              } }
            >
              ENTRAR
            </button>
            <button
              className="btn btn-small blue-mid-bg"
              data-testid="no-account-btn"
              onClick={ () => setRegister(true) }
              type="button"
            >
              Ainda não tenho conta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  socket: PropTypes.shape({
    emit: PropTypes.func,
  }).isRequired,
};

export default helper.Socket(Login);

import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { ClientContext } from '../../context/client/ClientProvider';
import validateName from '../../services/general/validateName';
import validateEmail from '../../services/general/validateEmail';
import validatePassword from '../../services/general/validatePassword';
import fetchUserData from '../../services/general/fetchUserData';
import fetchLoginData from '../../services/general/fetchLoginData';
import '../../css/registerPage.css';

const checked = (setUserData, userData) => {
  console.log('cheguei no checked')
  const isChecked = document.getElementById('want-to-sell').checked;
  if (isChecked) {
    setUserData({ ...userData, role: 'administrator' });
  } else {
    setUserData({ ...userData, role: 'client' });
  }
  console.log(isChecked, 'isChecked')
};

const setLocalStorage = async (userData, setLoggedIn) => {
  const userWithToken = await fetchLoginData(userData);
  localStorage.setItem('token', userWithToken.token);
  localStorage.setItem(
    'user',
    JSON.stringify({
      id: userWithToken.id,
      email: userData.email,
      role: userData.role,
      name: userData.name,
    }),
  );
  setLoggedIn(true);
};

const isUserRegistered = async (estados) => {
  const { isFetched, setIsFetched, setEmailRegistered, isEmailRegistered, userData} = estados

  if (isFetched) setIsFetched(false);
  const { message, role } = await fetchUserData(userData);
  setIsFetched(true);
  if (isEmailRegistered) {
    setEmailRegistered(false);
  }
  if (message === 'E-mail already in database.') {
    setEmailRegistered(true);
  }
  if (message === 'ok' && role === 'client') {
    setEmailRegistered(false);
  }
  if (message === 'ok' && role === 'administrator') {
    setEmailRegistered(false);
  }
};

const redirectRole = (userData, setLoggedIn, isEmailRegistered, isFetched, props) => {
  console.log(userData)
  if (isFetched && !isEmailRegistered && userData.role === 'client') {
    setLocalStorage(userData, setLoggedIn);
    return props.history.push('/products');
  }
  
  if (isFetched && !isEmailRegistered && userData.role === 'administrator') {
    setLocalStorage(userData, setLoggedIn);
    return props.history.push('/admin/orders');
  }
}

export default function RegisterPage(props) {
  const { isNameValid, setNameValid, isEmailValid, setEmailValid } = useContext(ClientContext);
  const { isPasswordValid, setPasswordValid, isEmailRegistered } = useContext(ClientContext);
  const { setEmailRegistered, isFetched, setIsFetched } = useContext(ClientContext);
  const { loggedIn, setLoggedIn, userData, setUserData } = useContext(ClientContext);
  const estados = { isFetched, setIsFetched, setEmailRegistered, isEmailRegistered, userData };

  return (
    <div className="allRegistro">
      <h2 className="title">Registro</h2>
      <div className="bodyRegistro">
        <div>
          <label htmlFor="name" className="labelRegistro">
            Nome
            <input
              type="text"
              id="name"
              data-testid="signup-name"
              className="inputRegistro"
              onChange={ ((event) => {
                setNameValid(validateName(event.target.value));
                setUserData({
                  ...userData,
                  name: event.target.value,
                });
              }) }
            />
          </label>
        </div>
        <div>
          <label htmlFor="email" className="labelRegistro">
            Email
            <input
              type="text"
              id="email"
              data-testid="signup-email"
              className="inputRegistro"
              onChange={ ((event) => {
                setEmailValid(validateEmail(event.target.value));
                setUserData({
                  ...userData,
                  email: event.target.value,
                });
              }) }
            />
          </label>
          {
            isEmailRegistered
              ? <div className="alradyDB">E-mail already in database.</div>
              : false
          }
        </div>
        <div>
          <label htmlFor="password" className="labelRegistro">
            Senha
            <input
              type="password"
              id="password"
              data-testid="signup-password"
              className="inputRegistro"
              onChange={ ((event) => {
                setPasswordValid(validatePassword(event.target.value));
                setUserData({
                  ...userData,
                  password: event.target.value,
                });
              }) }
            />
          </label>
        </div>
        <div>
          <label htmlFor="want-to-sell" className="labelCheckRegistro">
            <input
              type="checkbox"
              id="want-to-sell"
              data-testid="signup-seller"
              className="inputCheckRegistro"
              onChange={ () => {
                checked(setUserData, userData);
              } }
            />
            Quero Vender
          </label>
        </div>
        <div>
          <button
            type="button"
            data-testid="signup-btn"
            className="cadastrar"
            onClick={ () => {
              isUserRegistered(estados);
              redirectRole(userData, setLoggedIn, isEmailRegistered, isFetched, props)
            } }
            disabled={ !isNameValid || !isEmailValid || !isPasswordValid }
          >
            Cadastrar
          </button>
        </div>
      </div>
    </div>
  );
}

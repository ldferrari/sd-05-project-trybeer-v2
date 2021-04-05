import React, { useContext } from 'react';
import { ClientContext } from '../../context/client/ClientProvider';
import validateName from '../../services/general/validateName';
import validateEmail from '../../services/general/validateEmail';
import validatePassword from '../../services/general/validatePassword';
import fetchUserData from '../../services/general/fetchUserData';
import fetchLoginData from '../../services/general/fetchLoginData';
import '../../css/registerPage.css';

const setLocalStorage = async (userData) => {
  const userWithToken = await fetchLoginData(userData);
  console.log(userWithToken, 'userWithToken');
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
};

const checked = (setUserData, userData) => {
  const isChecked = document.getElementById('want-to-sell').checked;
  console.log(isChecked, 'isChecked');
  if (isChecked) {
    setUserData({ ...userData, role: 'administrator' });
  } else {
    setUserData({ ...userData, role: 'client' });
  }
};

const redirectRole = async (userData, props, role) => {
  if (role === 'client') {
    console.log('entrei no if');
    await setLocalStorage(userData);
    return props.history.push('/products');
  }

  if (role === 'administrator') {
    await setLocalStorage(userData);
    return props.history.push('/admin/orders');
  }
};

const isUserRegistered = async (estados) => {
  const { setEmailRegistered, userData, props } = estados;
  const { message, role } = await fetchUserData(userData);
  if (message === 'E-mail already in database.') {
    console.log('setar e-mail true');
    setEmailRegistered(true);
  }
  if (role === 'client' || role === 'administrator') {
    console.log('entrei no validador');
    setEmailRegistered(false);
    redirectRole(userData, props, role);
  }
};

export default function RegisterPage(props) {
  const { isNameValid, setNameValid, isEmailValid } = useContext(ClientContext);
  const { setEmailValid, isEmailRegistered } = useContext(ClientContext);
  const { isPasswordValid, setPasswordValid } = useContext(ClientContext);
  const { userData, setUserData, setEmailRegistered } = useContext(ClientContext);
  const estados = { setEmailRegistered, userData, props };

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
            onClick={ async () => {
              console.log('Chamando onClick');
              checked(setUserData, userData);
              isUserRegistered(estados);
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

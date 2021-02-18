import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import GeneralContext from '../../context/general/GeneralContext';
import { ClientContext } from '../../context/client/ClientProvider';
import loginData from '../../services/general/fetchLoginData';

const login = async (userData, setUserData, props) => {
  const usuario = await loginData(userData);
  setUserData({
    ...userData,
    id: usuario.id,
    role: usuario.role,
    name: usuario.name,
    email: usuario.email,
  });
  localStorage.setItem('token', usuario.token);
  localStorage.setItem('user', JSON.stringify({
    id: usuario.id,
    email: usuario.email,
    role: usuario.role,
    name: usuario.name,
  }));
  if (usuario.role === 'administrator') return props.history.push('/admin/orders');
  if (usuario.role === 'client') return props.history.push('/products');
  return true;
};

export default function LoginButtonEntrar({ props }) {
  const { userData, setUserData } = useContext(GeneralContext);
  const { isEmailValid, isPasswordValid } = useContext(ClientContext);
  return (
    <button
      type="button"
      data-testid="signin-btn"
      disabled={ !isEmailValid || !isPasswordValid }
      className="entrar"
      onClick={ () => {
        login(userData, setUserData, props);
      } }
    >
      ENTRAR
    </button>
  );
}

LoginButtonEntrar.propTypes = {
  props: PropTypes.arrayOf(PropTypes.object).isRequired,
};

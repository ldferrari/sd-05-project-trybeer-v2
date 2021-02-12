import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';

import TryBeerContext from '../context/TryBeerContext';
import { updateUser } from '../services/ApiTrybeer';
import Header from '../components/Header';
import ProfileNameInput from '../components/ProfileNameInput';
import ProfileEmailInput from '../components/ProfileEmailInput';
import ProfileButton from '../components/ProfileButton';

const userData = JSON.parse(localStorage.getItem('user'));
const email = userData && userData.user && userData.user.email;
const role = userData && userData.user && userData.user.role;
const token = userData && userData.token;

const handleClick = (event, data) => {
  const { name, setSuccess } = data;

  event.preventDefault();
  updateUser(name, email, token);
  if (name.length >= 1) setSuccess(true);
};

export default function Profile() {
  const [success, setSuccess] = useState(false);
  const { name } = useContext(TryBeerContext);
  const data = { name, email, setSuccess };

  if (!token) return <Redirect to="/login" />;
  return (
    <section>
      <Header title={ role === 'client' ? 'Meu perfil' : 'Perfil' } />
      <form>
        <ProfileNameInput role={ role } />
        <ProfileEmailInput role={ role } email={ email } />
        <ProfileButton name={ name } handleClick={ handleClick } data={ data } />
      </form>
      { success && <span>Atualização concluída com sucesso</span> }
    </section>
  );
}

import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

import './index.css';

import { getProfileInfo, postProfileInfo } from '../../services/requestAPI';
import Header from '../../components/header';
import Footer from '../../components/footer';

function inUseEffectStart({ setName, setEmail, setInitialName }) {
  async function asyncMe() {
    const token = localStorage.getItem('token');
    const {
      data: { user },
    } = await getProfileInfo(token);
    console.log(user);
    setName(user.name);
    setEmail(user.email);
    setInitialName(user.name);
    // setTokenLogged(token);
  }
  asyncMe();
}
function inUseEfName({ name, setValidName, initialName }) {
  const nameRegex = new RegExp(/^[A-Za-zÀ-ÿ \s]{12,}$/);
  const validationName = (value) => (nameRegex.test(value) && value !== initialName
    ? setValidName(true)
    : setValidName(false));
  validationName(name);
}
function handleSubmitFunction({ name, email, setAlertUpdate }) {
  return async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    setAlertUpdate('Atualização concluída com sucesso');
    await postProfileInfo(token, name, email);
    /* const tempo = 10000;
    setTimeout(() => {
      setAlertUpdate('Atualização concluída com sucesso');
    }, tempo); */
  };
}
function InputName(nomes, handleChanged) {
  return (
    <input
      type="text"
      name="name"
      id="name-id"
      value={ nomes }
      data-testid="profile-name-input"
      onChange={ handleChanged }
    />
  );
}
function InputEmail(email) {
  return (
    <input
      type="email"
      id="email"
      name="email-id"
      value={ email }
      data-testid="profile-email-input"
      readOnly
    />
  );
}
function InputButton(validName, handleSubmit) {
  return (
    <button
      type="submit"
      data-testid="profile-save-btn"
      disabled={ !validName }
      className={ validName ? 'ready loginBtn' : '' }
      onClick={ handleSubmit }
    >
      Salvar
    </button>
  );
}

function DivDadosClient({
  name: nomes,
  email,
  handleChanged,
  alertUpdate,
  validName,
  handleSubmit,
}) {
  return (
    <div className="form">
      <p>Nome:</p>
      {InputName(nomes, handleChanged)}
      <p>E-mail:</p>
      {InputEmail(email)}
      <span className="update-alert">{alertUpdate}</span>
      {InputButton(validName, handleSubmit)}
    </div>
  );
}
const useAllStates = () => {
  const [name, setName] = useState('');
  const [initialName, setInitialName] = useState('');
  const [alertUpdate, setAlertUpdate] = useState('');
  const [validName, setValidName] = useState(false);
  const [email, setEmail] = useState('');
  return {
    name,
    setName,
    initialName,
    setInitialName,
    alertUpdate,
    setAlertUpdate,
    validName,
    setValidName,
    email,
    setEmail,
  };
};
const Perfil = () => {
  const allStates = useAllStates();
  useEffect(() => {
    inUseEffectStart(allStates);
  }, []);
  useEffect(() => { inUseEfName(allStates); }, [allStates.name, allStates.initialName]);
  const handleChanged = (e) => allStates.setName(e.target.value);
  const handleSubmit = handleSubmitFunction(allStates);
  if (!localStorage.getItem('token')) { return <Redirect to="/login" />; }
  return (
    <div className="ProfilePage">
      <Header>Meu Perfil</Header>
      <h2 data-testid="top-title">Meu perfil</h2>
      {DivDadosClient({ ...allStates, handleChanged, handleSubmit })}
      {/* nomes, email, handleChanged, alertUpdate, validName, handleSubmit */}
      <Footer />
    </div>
  );
};

export default Perfil;

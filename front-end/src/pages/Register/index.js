import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
// import { Redirect } from 'react-router-dom';
import './index.css';
import { postRegister } from '../../services/requestAPI';
import Render1 from './componentsRegister/Render1';

let timer;

const saveToken = (token) => localStorage.setItem('token', token);

function useCreateStates() {
  const [validName, setValidName] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailUsed, setEmailUsed] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const obj1 = { validName, setValidName, validEmail, setValidEmail };
  const obj2 = { validPassword, setValidPassword, name, setName };
  const obj3 = { email, setEmail, password, setPassword };
  const obj4 = { emailUsed, setEmailUsed, isAdmin, setIsAdmin };
  return { ...obj1, ...obj2, ...obj3, ...obj4 };
}

function validationsFunctions(setValidName, setValidEmail, setValidPassword) {
  const validationName = (value) => (/^[A-Za-z \s]{12,}$/
    .test(value) ? setValidName(true) : setValidName(false));
  const validationEmail = (value) => (/[A-Za-z0-9]+@[A-Za-z]+[A-z]*(\.\w{2,3})+/
    .test(value)
    ? setValidEmail(true)
    : setValidEmail(false));

  const validationPassword = (value) => {
    const minLength = 6;
    return value.length >= minLength ? setValidPassword(true) : setValidPassword(false);
  };
  return [validationName, validationEmail, validationPassword];
}

const timeAlert = 10000;
// param = {name, email, password, isAdmin, setEmailUsed, props}
function handleSubmitFunction(param) {
  const { isAdmin, setEmailUsed, props } = param;
  return async (e) => {
    e.preventDefault();
    try {
      const { data: { token } } = await postRegister({
        ...param, role: isAdmin ? 'administrator' : 'client',
      });
      saveToken(token);
    } catch (error) {
      setEmailUsed('E-mail already in database.');
      timer = setTimeout(() => { setEmailUsed(''); }, timeAlert);
      return false;
    }
    if (timer) { clearTimeout(timer); }
    if (isAdmin) { return props.history.push('/admin/orders'); }
    return props.history.push('/products');
  };
}

/** const { validName, setValidName, validEmail, setValidEmail } = allStates;
  const { validPassword, setValidPassword, name, setName } = allStates;
  const { email, setEmail, password, setPassword, emailUsed } = allStates;
  */
const Register = (props) => {
  const allStates = useCreateStates();
  const { setValidPassword, name, email, password, setValidName } = allStates;
  const { setEmailUsed, isAdmin, setIsAdmin, setValidEmail } = allStates;
  const [validationName, validationEmail, validationPassword] = validationsFunctions(
    setValidName, setValidEmail, setValidPassword,
  );
  useEffect(() => { validationName(name); }, [name]);
  useEffect(() => { validationEmail(email); }, [email]);
  useEffect(() => { validationPassword(password); }, [password]);
  const obj1 = { name, email, password, isAdmin, setEmailUsed, props };
  const handleSubmit = handleSubmitFunction({ ...obj1 });
  const adminFunction = ({ target: { checked } }) => setIsAdmin(checked);
  return (
    <div className="registerPage">
      <h2 className="registerTitle">Registre-se:</h2>
      {Render1({ ...allStates, handleSubmit, adminFunction })}
    </div>
  );
};

export default Register;

// Register.propTypes = { history: PropTypes.instanceOf(Object).isRequired };

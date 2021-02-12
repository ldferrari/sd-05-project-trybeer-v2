import React, { useState, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';

import Context from '../context/Context';
import { registerUser } from '../services/api';
import { validateRegister } from '../services/validateRegister';
import logo from '../images/logo.png';
import './css/register.css';
import Form from '../components/Form';
import Button from '../components/Button';
import { bRegister } from '../components/data/registerData.json';

async function handleReg(userToRegister, setDesignetedRoute, userEmail) {
  if (!validateRegister(userToRegister)) return setDesignetedRoute(undefined);
  const response = await registerUser(userToRegister);
  if (response.message) {
    const labelEmail = document.querySelector('#lblEmail');
    const alreadyExists = document.createElement('span');
    alreadyExists.innerHTML = 'E-mail already in database.';
    return labelEmail.appendChild(alreadyExists);
  }
  localStorage.setItem('role', response.role);
  localStorage.setItem('token', response.token);
  localStorage.setItem('email', userEmail);
  return response.role === 'client'
    ? setDesignetedRoute('/products')
    : setDesignetedRoute('/admin/orders');
}
const Register = () => {
  const { userEmail } = useContext(Context);
  const [designatedRoute, setDesignetedRoute] = useState(undefined);
  const handleRegister = async (userReg, e) => {
    e.preventDefault();
    handleReg(userReg, setDesignetedRoute, userEmail);
  };
  return (
    <div className="register">
      <img src={ logo } alt="logo" className="logo" />
      { designatedRoute !== undefined ? <Redirect to={ designatedRoute } /> : null}
      <Form>
        <Button b={ bRegister } type="submit" t={ handleRegister } />
        <button type="button" className="btn-return">
          <Link to="/login">Voltar</Link>
        </button>
      </Form>
    </div>
  );
};

export default Register;

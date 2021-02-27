import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { apiRegister } from '../services/ApiTrybeer';
import validate from '../services/validation';
import TryBeerContext from '../context/TryBeerContext';

const unprocessable = 422;
const reverse = -1;

const handleSubmit = async (e,
  { setEmailAlreadyExists, name, email, password, role, history }) => {
  e.preventDefault();
  const result = await apiRegister(name, email, password, role);
  const response = result.message && +result.message.split(' ').slice(reverse)[0];
  localStorage.setItem('user', JSON.stringify(result));
  return response === unprocessable
    ? setEmailAlreadyExists('E-mail already in database.')
    : history.push(role === 'client' ? '/products' : '/admin/orders');
};

const SignupBtn = () => {
  const { setEmailAlreadyExists, name, email, password, role,
  } = useContext(TryBeerContext);
  const history = useHistory();
  const submitParams = { setEmailAlreadyExists, name, email, password, role, history };
  return (
    <button
      data-testid="signup-btn"
      type="button"
      disabled={ !validate(email, password, name) }
      onClick={ (e) => handleSubmit(e, submitParams) }
    >
      Cadastrar
    </button>
  );
};

export default SignupBtn;

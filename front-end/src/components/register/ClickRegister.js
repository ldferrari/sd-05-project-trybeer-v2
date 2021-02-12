import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import TrybeerContext from '../../context/TrybeerContext';
import RegisterContext from '../../context/RegisterContext';
import { createUser } from '../../services/fetch';

function registerBtn(checkedName, checkedEmail, checkedPassword, handleClickRegister) {
  return (
    <button
      type="button"
      data-testid="signup-btn"
      disabled={ !(checkedName && checkedEmail && checkedPassword) }
      onClick={ () => handleClickRegister() }
    >
      Cadastrar
    </button>
  );
}

function ClickRegister({ history }) {
  const { name, email, password, admin } = useContext(TrybeerContext);
  const { checkedName, checkedEmail, checkedPassword, setEmailExists } = useContext(RegisterContext);
  const handleResult = async (result) => {
    console.log('in handleResult');
    if (result.message === 'E-mail already in database') setEmailExists(true);
    localStorage.setItem('user', JSON.stringify(result));
    if (result.role === 'administrator') history.push('/admin/orders');
    if (result.role === 'client') history.push('/products');
  };
  const handleClickRegister = async () => {
    const role = admin ? 'administrator' : 'client';
    await createUser(name, email, password, role).then((result) => handleResult(result));
  };
  return registerBtn(checkedName, checkedEmail, checkedPassword, handleClickRegister);
}

export default withRouter(ClickRegister);

ClickRegister.propTypes = {
  history: PropTypes.arrayOf(Object).isRequired,
};

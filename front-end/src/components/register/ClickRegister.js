import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import TrybeerContext from '../../context/TrybeerContext';
import RegisterContext from '../../context/RegisterContext';
import { createUser } from '../../services/fetch';
import { roleRedirect } from '../../services/register';

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
  const { checkedName, checkedEmail, checkedPassword } = useContext(RegisterContext);
  const [emailExists, setEmailExists] = useState(false);
  const handleResult = async (result) => {
    if (result.message === 'E-mail already in database') setEmailExists(true);
    localStorage.setItem('user', JSON.stringify(result));
    roleRedirect(result, history);
  };
  const handleClickRegister = async () => {
    const role = admin ? 'administrator' : 'client';
    await createUser(name, email, password, role).then((result) => handleResult(result));
  };
  return (
    <div>
      {registerBtn(checkedName, checkedEmail, checkedPassword, handleClickRegister)}
      {emailExists ? <div>E-mail already in database.</div> : null}
    </div>
  );
}

export default withRouter(ClickRegister);

ClickRegister.propTypes = {
  history: PropTypes.arrayOf(Object).isRequired,
};

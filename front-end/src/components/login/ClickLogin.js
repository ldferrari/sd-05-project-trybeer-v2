import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TrybeerContext from '../../context/TrybeerContext';
import RegisterContext from '../../context/RegisterContext';
import { login } from '../../services/fetch';

function ClickLogin({ history }) {
  const { email, password } = useContext(TrybeerContext);
  const { checkedEmail, checkedPassword } = useContext(RegisterContext);
  const handleResult = (result) => {
    localStorage.setItem('user', JSON.stringify(result));
    if (result.role === 'administrator') history.push('/admin/orders');
    if (result.role === 'client') history.push('/products');
  };
  return (
    <button
      type="button"
      data-testid="signin-btn"
      disabled={ !(checkedEmail && checkedPassword) }
      onClick={ () => login(email, password).then((result) => handleResult(result)) }
    >
      ENTRAR
    </button>
  );
}

export default withRouter(ClickLogin);

ClickLogin.propTypes = {
  history: PropTypes.arrayOf(Object).isRequired,
};

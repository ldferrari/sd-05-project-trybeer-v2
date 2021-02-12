import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Context from '../context/Context';

const setData = (registerContext) => (
  {
    name: registerContext.userName,
    email: registerContext.userEmail,
    password: registerContext.password,
    checkbox: registerContext.seller,
  }
);

const Button = (props) => {
  const { t, b: { type, dataT, classBtn, bName, disabled } } = props;
  const registerContext = useContext(Context);
  const userData = setData(registerContext);
  return (
    <button
      type={ type === 'submit' ? 'submit' : 'button' }
      data-testid={ dataT }
      className={ classBtn }
      disabled={ disabled }
      onClick={ (e) => t(userData, e) }
    >
      { bName }
    </button>
  );
};

Button.propTypes = {
  b: PropTypes.shape({
    type: PropTypes.string,
    dataT: PropTypes.string,
    classBtn: PropTypes.string,
    bName: PropTypes.string,
    disabled: PropTypes.bool,
  }).isRequired,
  t: PropTypes.func.isRequired,
};

export default Button;

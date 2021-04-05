import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import validatePassword from '../../services/general/validatePassword';
import GeneralContext from '../../context/general/GeneralContext';

export default function LoginSenhaInput({ setPasswordValid }) {
  const { userData, setUserData } = useContext(GeneralContext);
  return (
    <label htmlFor="senha" className="label">
      Senha
      <input
        type="password"
        id="senha"
        data-testid="password-input"
        className="input"
        onChange={ (event) => {
          if (validatePassword(event.target.value)) {
            setPasswordValid(true);
            setUserData({ ...userData, password: event.target.value });
          }
        } }
      />
    </label>
  );
}

LoginSenhaInput.propTypes = {
  setPasswordValid: PropTypes.bool.isRequired,
};

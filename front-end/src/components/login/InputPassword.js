import React, { useContext } from 'react';
import TrybeerContext from '../../context/TrybeerContext';
import RegisterContext from '../../context/RegisterContext';
import { checkPassword } from '../../services/checkUserData';
// import PropTypes from 'prop-types';

function InputPassword() {
  const { setPassword } = useContext(TrybeerContext);
  const { checkedPassword, setCheckedPassword } = useContext(RegisterContext);
  const handlePasswordChange = (e) => {
    setCheckedPassword(checkPassword(e.target.value));
    if (!checkedPassword) {
      console.log('password has to have 6 caracteres');
    }
    return setPassword(e.target.value);
  };
  return (
    <div className="login-input">
      <p>Senha</p>
      <input
        type="password"
        data-testid="password-input"
        name="password"
        onChange={(e) => handlePasswordChange(e)}
      />
    </div>
  );
}

export default InputPassword;
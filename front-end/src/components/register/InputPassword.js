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
    if (checkedPassword) {
      setPassword(e.target.value);
    }
  };
  return (
    <section>
     <div>Senha</div>
      <input
        data-testid="signup-password"
        type="password"
        onChange={(e) => handlePasswordChange(e)}
      />
    </section>
  );
}

export default InputPassword;

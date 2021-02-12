import React, { useContext } from 'react';
import TrybeerContext from '../../context/TrybeerContext';
import RegisterContext from '../../context/RegisterContext';
import { checkEmail } from '../../services/checkUserData';
// import PropTypes from 'prop-types';

function InputEmail() {
  const { setEmail } = useContext(TrybeerContext);
  const { checkedEmail, setCheckedEmail } = useContext(RegisterContext);
  const handleEmailChange = (e) => {
    setCheckedEmail(checkEmail(e.target.value));
    if (!checkedEmail) {
      console.log('email is bad format');
    }
    return setEmail(e.target.value);
  };
  return (
    <div className="login-input">
      <p>Email</p>
      <input
        type="email"
        data-testid="email-input"
        onChange={(e) => handleEmailChange(e)}
      />
    </div>
  );
}

export default InputEmail;

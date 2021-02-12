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
    if (checkedEmail) {
      setEmail(e.target.value);
    }
  };
  return (
    <section>
      <div>Email</div>
      <input data-testid="signup-email" type="text" onChange={ (e) => handleEmailChange(e) } />
    </section>
  );
}

export default InputEmail;

import React, { useContext } from 'react';
// import PropTypes from 'prop-types';
// import { withRouter } from 'react-router-dom';
import RegisterContext from '../context/RegisterContext';
import SellCheckbox from '../components/register/SellCheckbox';
import InputName from '../components/register/InputName';
import InputEmail from '../components/register/InputEmail';
import InputPassword from '../components/register/InputPassword';
import ClickRegister from '../components/register/ClickRegister';

function Register() {
  const { emailExists } = useContext(RegisterContext);
  return (
    <div>
      <InputName />
      <InputEmail />
      <div>
        <InputPassword />
        <SellCheckbox />
      </div>
      <ClickRegister />
      {emailExists ? <div>E-mail already in database.</div> : null}
    </div>
  );
}

// export default withRouter(Register);
export default Register;

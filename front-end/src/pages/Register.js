import React, { useContext } from 'react';

import TryBeerContext from '../context/TryBeerContext';
import InputName from '../components/InputName';
import InputEmail from '../components/InputEmail';
import InputPassword from '../components/InputPassword';
import CheckRole from '../components/CheckRole';
import SignupBtn from '../components/SignupBtn';

const Register = () => {
  const { emailAlreadyExists } = useContext(TryBeerContext);

  return (
    <form>
      <InputName />
      <InputEmail />
      <InputPassword />
      <CheckRole />
      <SignupBtn />
      <span>{ emailAlreadyExists }</span>
    </form>
  );
};

export default Register;

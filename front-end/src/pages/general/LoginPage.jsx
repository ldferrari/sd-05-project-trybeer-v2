import React, { useContext } from 'react';
import { ClientContext } from '../../context/client/ClientProvider';
import LoginEmailInput from '../../components/general/LoginEmailInput';
import LoginSenhaInput from '../../components/general/LoginSenhaInput';
import LoginButtonEntrar from '../../components/general/LoginButtonEntrar';
import LoginButtonRegister from '../../components/general/LoginButtonRegister';
import '../../css/loginPage.css';

export default function LoginPage(props) {
  const { setPasswordValid } = useContext(ClientContext);
  return (
    <div className="login">
      <div className="inputs">
        <LoginEmailInput />
        <LoginSenhaInput setPasswordValid={ setPasswordValid } />
      </div>
      <LoginButtonEntrar props={ props } />
      <LoginButtonRegister />
    </div>
  );
}

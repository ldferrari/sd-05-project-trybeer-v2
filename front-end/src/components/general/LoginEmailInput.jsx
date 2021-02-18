import React, { useContext } from 'react';
import validateEmail from '../../services/general/validateEmail';
import GeneralContext from '../../context/general/GeneralContext';
import { ClientContext } from '../../context/client/ClientProvider';

export default function LoginEmailInput() {
  const { userData, setUserData } = useContext(GeneralContext);
  const { setEmailValid } = useContext(ClientContext);
  return (
    <label htmlFor="email" className="label">
      Email
      <input
        id="email"
        data-testid="email-input"
        className="input"
        onChange={ (event) => {
          if (validateEmail(event.target.value)) {
            setEmailValid(true);
            setUserData({ ...userData, email: event.target.value });
          }
        } }
      />
    </label>
  );
}

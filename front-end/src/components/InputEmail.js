import React, { useContext } from 'react';
import TryBeerContext from '../context/TryBeerContext';

const InputEmail = () => {
  const { email, setEmail } = useContext(TryBeerContext);
  return (
    <label htmlFor="signup-email">
      Email
      <input
        data-testid="signup-email"
        type="email"
        value={ email }
        placeholder="Email"
        onChange={ (e) => setEmail(e.target.value) }
      />
    </label>
  );
};

export default InputEmail;

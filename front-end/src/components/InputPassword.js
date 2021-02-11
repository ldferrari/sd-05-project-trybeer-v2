import React, { useContext } from 'react';
import TryBeerContext from '../context/TryBeerContext';

const InputPassword = () => {
  const { password, setPassword } = useContext(TryBeerContext);
  return (
    <label htmlFor="signup-password">
      Senha
      <input
        data-testid="signup-password"
        type="password"
        value={ password }
        placeholder="Senha"
        onChange={ (e) => setPassword(e.target.value) }
      />
    </label>
  );
};

export default InputPassword;

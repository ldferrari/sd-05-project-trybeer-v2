import React, { useContext } from 'react';
import TryBeerContext from '../context/TryBeerContext';

const InputName = () => {
  const { name, setName } = useContext(TryBeerContext);
  return (
    <label htmlFor="signup-name">
      Nome
      <input
        data-testid="signup-name"
        type="text"
        value={ name }
        placeholder="Name"
        onChange={ (e) => setName(e.target.value) }
      />
    </label>
  );
};

export default InputName;

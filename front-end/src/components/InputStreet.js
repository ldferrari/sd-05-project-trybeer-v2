import React, { useContext } from 'react';
import TryBeerContext from '../context/TryBeerContext';

const InputStreet = () => {
  const { setStreetName } = useContext(TryBeerContext);
  return (
    <label htmlFor="checkout-street-input">
      Rua:
      <input
        type="text"
        data-testid="checkout-street-input"
        onChange={ (event) => setStreetName(event.target.value) }
      />
    </label>
  );
};

export default InputStreet;

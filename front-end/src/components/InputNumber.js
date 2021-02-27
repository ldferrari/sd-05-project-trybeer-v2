import React, { useContext } from 'react';
import TryBeerContext from '../context/TryBeerContext';

const InputNumber = () => {
  const { setHouseNumber } = useContext(TryBeerContext);
  return (
    <label htmlFor="checkout-house-number-input">
      Número da casa:
      <input
        type="text"
        onChange={ (event) => setHouseNumber(event.target.value) }
        data-testid="checkout-house-number-input"
      />
    </label>
  );
};

export default InputNumber;

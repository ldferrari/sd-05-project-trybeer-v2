import React, { useContext } from 'react';
import CheckoutContext from '../../../context/CheckoutContext';

function StreetInput() {
  const { setStreet } = useContext(CheckoutContext);
  const handleStreetInput = (input) => {
    setStreet(input);
  };
  return (
    <div>
      <h3>Endereço</h3>
      <label htmlFor="street">
        Rua:
        <input
          data-testid="checkout-street-input"
          type="input"
          id="street"
          onChange={ (e) => handleStreetInput(e.target.value) }
        />
      </label>
    </div>
  );
}

export default StreetInput;

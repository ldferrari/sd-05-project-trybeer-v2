import React, { useContext } from 'react';
import CheckoutContext from '../../../context/CheckoutContext';

function HouseInput() {
  const { setHouseNum } = useContext(CheckoutContext);
  const handleHouseNumInput = (input) => {
    setHouseNum(input);
  };
  return (
    <div>
      <label htmlFor="house">
        Número da casa:
        <input
          data-testid="checkout-house-number-input"
          type="input"
          id="house"
          onChange={ (e) => handleHouseNumInput(e.target.value) }
        />
      </label>
    </div>
  );
}

export default HouseInput;

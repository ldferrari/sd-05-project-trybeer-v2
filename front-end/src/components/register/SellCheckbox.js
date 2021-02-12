import React, { useContext } from 'react';
import TrybeerContext from '../../context/TrybeerContext';
// import PropTypes from 'prop-types';

function SellCheckbox() {
  const { setAdmin } = useContext(TrybeerContext);
  return (
    <label htmlFor="vender">
      <input
        data-testid="signup-seller"
        type="checkbox"
        id="vender"
        onClick={() => setAdmin(true)}
      />
      Quero Vender
    </label>
  );
}

export default SellCheckbox;

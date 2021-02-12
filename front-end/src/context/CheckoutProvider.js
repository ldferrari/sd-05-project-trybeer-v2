import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CheckoutContext from './CheckoutContext';

const CheckoutProvider = ({ children }) => {
  const [street, setStreet] = useState('');
  const initialState = 0;
  const [statusSale, setStatusSale] = useState(false);
  const [houseNum, setHouseNum] = useState(initialState);
  const context = {
    street,
    setStreet,
    houseNum,
    setHouseNum,
    statusSale,
    setStatusSale,
  };
  return (
    <CheckoutContext.Provider value={ context }>{children}</CheckoutContext.Provider>
  );
};

export default CheckoutProvider;

CheckoutProvider.propTypes = {
  children: PropTypes.objectOf(Object).isRequired,
};

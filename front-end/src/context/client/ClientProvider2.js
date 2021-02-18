import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

export const CContext2 = createContext();

const ClientProvider2 = ({ children }) => {
  const [cartItens, setCartItens] = useState(JSON
    .parse(localStorage.getItem('cart itens')) || []);
  const [redirect, setRedirect] = useState(false);
  const [street, setStreet] = useState('');
  const [streetNumber, setStreetNumber] = useState('');
  const context = {
    cartItens,
    setCartItens,
    redirect,
    setRedirect,
    street,
    setStreet,
    streetNumber,
    setStreetNumber,
  };
  return <CContext2.Provider value={ context }>{children}</CContext2.Provider>;
};

export default ClientProvider2;

ClientProvider2.propTypes = {
  children: PropTypes.objectOf(Object).isRequired,
};

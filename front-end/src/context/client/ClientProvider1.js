import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

export const CContext1 = createContext();

const initialQuantity = 0;

const ClientProvider1 = ({ children }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(localStorage.getItem('cart') || initialQuantity);
  const context = {
    email,
    setEmail,
    name,
    setName,
    products,
    setProducts,
    cart,
    setCart,
  };
  return <CContext1.Provider value={ context }>{children}</CContext1.Provider>;
};

export default ClientProvider1;

ClientProvider1.propTypes = {
  children: PropTypes.objectOf(Object).isRequired,
};

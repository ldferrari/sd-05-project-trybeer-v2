import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TryBeerContext from './TryBeerContext';

const cartStored = JSON.parse(localStorage.getItem('cart'));
const noValue = 1;

const Provider = ({ children }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [checked, setChecked] = useState(false);
  const [productsList, setProductList] = useState([]);
  const [role, setRole] = useState('client');
  const [quantity, setQuantity] = useState(noValue);
  const [streetName, setStreetName] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [total, setTotal] = useState('');
  const [emailAlreadyExists, setEmailAlreadyExists] = useState('');
  const [success, setSuccess] = useState(false);
  const [cartItems, setCartItems] = useState(cartStored || []);
  const [status, setStatus] = useState('');

  const contextValue = { email,
    setEmail,
    password,
    setPassword,
    name,
    setName,
    checked,
    setChecked,
    productsList,
    setProductList,
    quantity,
    setQuantity,
    total,
    setTotal,
    streetName,
    setStreetName,
    role,
    setRole,
    emailAlreadyExists,
    setEmailAlreadyExists,
    houseNumber,
    setHouseNumber,
    success,
    setSuccess,
    cartItems,
    setCartItems,
    status,
    setStatus,
  };

  return (
    <TryBeerContext.Provider value={ contextValue }>
      {children}
    </TryBeerContext.Provider>
  );
};

export default Provider;

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

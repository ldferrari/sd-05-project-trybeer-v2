import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function Provider({ children }) {
  const zero = 0;
  const [userName, setUserName] = useState([]);
  const [password, setPassword] = useState('');
  const [userEmail, setUserEmail] = useState([]);
  const [seller, setSeller] = useState(false);
  const [beers, setBeers] = useState([]);
  const [total, setTotal] = useState(zero);
  const [cart, setCart] = useState([]);
  // const [order, setOrder] = useState()
  const dataContext = {
    userName,
    setUserName,
    userEmail,
    setUserEmail,
    password,
    setPassword,
    seller,
    setSeller,
    beers,
    setBeers,
    total,
    setTotal,
    cart,
    setCart,
  };
  return <Context.Provider value={ dataContext }>{children}</Context.Provider>;
}
Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Provider;
import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';
// import ClientContext from './ClientContext';

export const ClientContext = createContext();

const initialQuantity = 0;

const ClientProvider = ({ children }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(localStorage.getItem('cart') || initialQuantity);
  const [cartItens, setCartItens] = useState(JSON
    .parse(localStorage.getItem('cart itens')) || []);
  const [redirect, setRedirect] = useState(false);
  const [street, setStreet] = useState('');
  const [streetNumber, setStreetNumber] = useState('');
  const [purchaseDone, setPurchaseDone] = useState(false);
  const [isNameValid, setNameValid] = useState(false);
  const [isEmailValid, setEmailValid] = useState(false);
  const [isPasswordValid, setPasswordValid] = useState(false);
  const [isEmailRegistered, setEmailRegistered] = useState(false);
  console.log(isEmailRegistered, 'isEmailRegistered')
  const [isFetched, setIsFetched] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    id: '',
    name: '',
    email: '',
    password: '',
    role: 'client',
  });
  const context = {
    email,
    setEmail,
    name,
    setName,
    products,
    setProducts,
    cart,
    setCart,
    cartItens,
    setCartItens,
    redirect,
    setRedirect,
    street,
    setStreet,
    streetNumber,
    setStreetNumber,
    purchaseDone,
    setPurchaseDone,
    isNameValid,
    setNameValid,
    isEmailValid,
    setEmailValid,
    isPasswordValid,
    setPasswordValid,
    isEmailRegistered,
    setEmailRegistered,
    isFetched,
    setIsFetched,
    loggedIn,
    setLoggedIn,
    userData,
    setUserData,
  };
  return <ClientContext.Provider value={ context }>{children}</ClientContext.Provider>;
};

export default ClientProvider;

ClientProvider.propTypes = {
  children: PropTypes.objectOf(Object).isRequired,
};

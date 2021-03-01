import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

export const CContext3 = createContext();

const ClientProvider3 = ({ children }) => {
  const [purchaseDone, setPurchaseDone] = useState(false);
  const [isEmailValid, setEmailValid] = useState(false);
  const [isNameValid, setNameValid] = useState(false);
  const [isPasswordValid, setPasswordValid] = useState(false);
  const [isEmailRegistered, setEmailRegistered] = useState(false);
  const context = {
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
  };
  return <CContext3.Provider value={ context }>{children}</CContext3.Provider>;
};

export default ClientProvider3;

ClientProvider3.propTypes = {
  children: PropTypes.objectOf(Object).isRequired,
};

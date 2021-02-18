import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

export const GContext1 = createContext();

const GeneralProvider1 = ({ children }) => {
  const [initialUser] = useState({
    email: '',
    password: '',
    role: '',
    name: '',
  });
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    role: '',
    name: '',
  });
  const context = {
    initialUser,
    userData,
    setUserData,
  };
  return <GContext1.Provider value={ context }>{children}</GContext1.Provider>;
};

export default GeneralProvider1;

GeneralProvider1.propTypes = {
  children: PropTypes.objectOf(Object).isRequired,
};

import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

export const CContext4 = createContext();

const ClientProvider4 = ({ children }) => {
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
    isFetched,
    setIsFetched,
    loggedIn,
    setLoggedIn,
    userData,
    setUserData,
  };
  return <CContext4.Provider value={ context }>{children}</CContext4.Provider>;
};

export default ClientProvider4;

ClientProvider4.propTypes = {
  children: PropTypes.objectOf(Object).isRequired,
};

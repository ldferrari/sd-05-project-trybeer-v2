import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

const GeneralContext1 = createContext();
export { GeneralContext1 };

const GeneralProvider1 = ({ children }) => {
  const [initialUser] = useState({
    email: '',
    password: '',
    role: '',
    name: ''
  });
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    role: '',
    name: ''
  });
  const context = {
    initialUser,
    userData,
    setUserData,
  };
  return <GeneralContext1.Provider value={ context }>{children}</GeneralContext1.Provider>;
};

export default GeneralProvider1;

GeneralProvider1.propTypes = {
  children: PropTypes.objectOf(Object).isRequired,
};
import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

export const GContext2 = createContext();

const GeneralProvider2 = ({ children }) => {
  const [nameEqual, setNameEqual] = useState(true);
  const [apiSuccess, setApiSuccess] = useState(false);
  const context = {
    nameEqual,
    setNameEqual,
    apiSuccess,
    setApiSuccess,
  };
  return <GContext2.Provider value={ context }>{children}</GContext2.Provider>;
};

export default GeneralProvider2;

GeneralProvider2.propTypes = {
  children: PropTypes.objectOf(Object).isRequired,
};

import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

const GeneralContext2 = createContext();
export { GeneralContext2 };

const GeneralProvider2 = ({ children }) => {
  const [nameEqual, setNameEqual] = useState(true);
  const [apiSuccess, setApiSuccess] = useState(false);
  const context = {
    nameEqual,
    setNameEqual,
    apiSuccess,
    setApiSuccess,
  };
  return <GeneralContext2.Provider value={ context }>{children}</GeneralContext2.Provider>;
};

export default GeneralProvider2;

GeneralProvider2.propTypes = {
  children: PropTypes.objectOf(Object).isRequired,
};
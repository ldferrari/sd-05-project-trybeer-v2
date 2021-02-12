import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RegisterContext from './RegisterContext';

const RegisterProvider = ({ children }) => {
  const [checkedName, setCheckedName] = useState(false);
  const [checkedEmail, setCheckedEmail] = useState(false);
  const [checkedPassword, setCheckedPassword] = useState(false);
  const context = {
    checkedName,
    setCheckedName,
    checkedEmail,
    setCheckedEmail,
    checkedPassword,
    setCheckedPassword,
  };
  return (
    <RegisterContext.Provider value={ context }>
      {children}
    </RegisterContext.Provider>
  );
};

export default RegisterProvider;

RegisterProvider.propTypes = {
  children: PropTypes.objectOf(Object).isRequired,
};

import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';
// import ClientContext from './ClientContext';

export const AdminContext = createContext();

const AdminProvider = ({ children }) => {
  const [clientChatNickName, setClientChatNickName] = useState('');
  const context = {
    clientChatNickName,
    setClientChatNickName,
  };
  return <AdminContext.Provider value={ context }>{children}</AdminContext.Provider>;
};

export default AdminProvider;

AdminProvider.propTypes = {
  children: PropTypes.objectOf(Object).isRequired,
};

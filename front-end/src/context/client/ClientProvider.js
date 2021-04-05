import React, { useContext, createContext } from 'react';
import PropTypes from 'prop-types';
import { CContext1 } from './ClientProvider1';
import { CContext2 } from './ClientProvider2';
import { CContext3 } from './ClientProvider3';
import { CContext4 } from './ClientProvider4';

export const ClientContext = createContext();

const ClientProvider = ({ children }) => {
  const CliContext1 = useContext(CContext1);
  const CliContext2 = useContext(CContext2);
  const CliContext3 = useContext(CContext3);
  const CliContext4 = useContext(CContext4);
  return (
    <ClientContext.Provider
      value={ {
        ...CliContext1,
        ...CliContext2,
        ...CliContext3,
        ...CliContext4,
      } }
    >
      {children}
    </ClientContext.Provider>
  );
};

export default ClientProvider;

ClientProvider.propTypes = {
  children: PropTypes.objectOf(Object).isRequired,
};

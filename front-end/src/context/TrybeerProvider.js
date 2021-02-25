import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TrybeerContext from './TrybeerContext';
// Caso for preciso fazer mais de um provider e contexto
// por critério de legibilidade de código,
// Não esquecer de ajustar o index.js geral.

const TrybeerProvider = ({ children }) => {
  const linter = Number(localStorage.getItem('totalPrice'));
  const zero = 0;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [admin, setAdmin] = useState(false);
  const [click, setClick] = useState(false);
  const [totalPrice, setTotalPrice] = useState(linter || zero);
  const [status, setStatus] = useState('alguum status');

  const context = {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    admin,
    setAdmin,
    click,
    setClick,
    totalPrice,
    setTotalPrice,
    status,
    setStatus,
  };

  return (
    <TrybeerContext.Provider value={ context }>
      {children}
    </TrybeerContext.Provider>
  );
};

export default TrybeerProvider;

TrybeerProvider.propTypes = {
  children: PropTypes.objectOf(Object).isRequired,
};

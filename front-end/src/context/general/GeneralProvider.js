import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import GeneralContext from './GeneralContext';
import { GContext1 } from './GeneralProvider1';
import { GContext2 } from './GeneralProvider2';

const GeneralProvider = ({ children }) => {
  const GenContext1 = useContext(GContext1);
  const GenContext2 = useContext(GContext2);
  return (
    <GeneralContext.Provider value={ { ...GenContext1, ...GenContext2 } }>
      {children}
    </GeneralContext.Provider>
  );
};

export default GeneralProvider;

GeneralProvider.propTypes = {
  children: PropTypes.objectOf(Object).isRequired,
};

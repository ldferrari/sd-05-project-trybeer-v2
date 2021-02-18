import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import GeneralContext from './GeneralContext';
import { GeneralContext1 } from './GeneralProvider1';
import { GeneralContext2 } from './GeneralProvider2';
import GeneralProvider1 from './GeneralProvider1';
import GeneralProvider2 from './GeneralProvider2';

const GeneralProvider = ({ children }) => {
  const GenContext1 = useContext(GeneralContext1);
  const GenContext2 = useContext(GeneralContext2);
  return (
    <GeneralContext.Provider value={ { ...GenContext1, ...GenContext2 } }>
      <GeneralProvider1>
        {children}
      </GeneralProvider1>
    </GeneralContext.Provider>
  );
};

export default GeneralProvider;

/* export const AllProviders = GeneralProvider(
  GeneralProvider1,
  GeneralProvider2,
); */

GeneralProvider.propTypes = {
  children: PropTypes.objectOf(Object).isRequired,
};

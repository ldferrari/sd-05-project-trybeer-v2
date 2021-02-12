import React from 'react';
import PropTypes from 'prop-types';

import Input from './Input';
import {
  iName,
  iPassword,
  iCheckbox,
  iEmail,
} from './data/registerData.json';

const Form = ({ children }) => (
  <form id="register-form">
    <Input i={ iName } />
    <Input i={ iEmail } />
    <Input i={ iPassword } />
    <Input i={ iCheckbox } />
    {children}
  </form>
);

export default Form;

Form.propTypes = {
  children: PropTypes.string.isRequired,
};

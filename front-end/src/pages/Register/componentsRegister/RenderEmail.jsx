import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import { Redirect } from 'react-router-dom';
import '../index.css';

const RenderEmail = ({ setEmail }) => (
  <fieldset>
    <label htmlFor="email">
      Email:
      <input
        type="email"
        name="email"
        onChange={ ({ target: { value } }) => setEmail(value) }
        data-testid="signup-email"
      />
    </label>
  </fieldset>
);

export default RenderEmail;

 RenderEmail.propTypes = { setEmail: PropTypes.func.isRequired };

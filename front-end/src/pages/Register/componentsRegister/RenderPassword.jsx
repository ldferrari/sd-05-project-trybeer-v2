import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import { Redirect } from 'react-router-dom';
import '../index.css';



const RenderPassword = ({ setPassword }) => (
  <fieldset>
    <label htmlFor="password">
      Senha:
      <input
        type="password"
        name="password"
        onChange={ ({ target: { value } }) => setPassword(value) }
        data-testid="signup-password"
      />
    </label>
  </fieldset>
);
export default RenderPassword;

RenderPassword.propTypes = { setPassword: PropTypes.func.isRequired };

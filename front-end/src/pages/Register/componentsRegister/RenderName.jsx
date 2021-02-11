import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import { Redirect } from 'react-router-dom';
import '../index.css';
// import { postRegister } from '../../../services/requestAPI';

const RenderName = ({ setName }) => (
  <fieldset>
    <label htmlFor="name">
      Nome:
      <input
        type="text"
        name="name"
        onChange={ ({ target: { value } }) => setName(value) }
        data-testid="signup-name"
      />
    </label>
  </fieldset>
);
export default RenderName;

RenderName.propTypes = { setName: PropTypes.func.isRequired };

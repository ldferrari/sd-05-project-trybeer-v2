import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import { Redirect } from 'react-router-dom';
import '../index.css';

const RenderCheckbox = ({ adminFunction }) => (
  <fieldset className="checkbox">
    <label htmlFor="seller">
      <input
        id="seller"
        type="checkbox"
        onClick={ adminFunction }
        data-testid="signup-seller"
      />
      Quero Vender
    </label>
  </fieldset>
);
export default RenderCheckbox;

RenderCheckbox.propTypes = { adminFunction: PropTypes.func.isRequired };

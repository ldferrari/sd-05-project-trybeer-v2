import React from 'react';
import PropTypes from 'prop-types';
// import { Redirect } from 'react-router-dom';
import '../index.css';

const RenderButton = ({ validEmail, validPassword, validName, handleSubmit }) => (
  <button
    type="submit"
    disabled={ !(validEmail && validPassword && validName) }
    className={ validEmail && validPassword && validName ? 'ready loginBtn' : '' }
    onClick={ handleSubmit }
    data-testid="signup-btn"
  >
    Cadastrar
  </button>
);
export default RenderButton;

RenderButton.propTypes = { 
  validEmail: PropTypes.bool.isRequired,
  validPassword: PropTypes.bool.isRequired,
  validName: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

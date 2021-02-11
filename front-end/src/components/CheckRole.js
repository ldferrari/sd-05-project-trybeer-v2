import React from 'react';
import PropTypes from 'prop-types';

const CheckRole = ({ setRole, role }) => {
  const handleClick = () => setRole(role === 'client' ? 'administrator' : 'client');
  return (
    <label htmlFor="signup-seller">
      <input data-testid="signup-seller" type="checkbox" onClick={ handleClick } />
      Quero Vender
    </label>);
};

export default CheckRole;

CheckRole.propTypes = {
  role: PropTypes.string,
  setRole: PropTypes.func,
};

CheckRole.defaultProps = {
  role: 'client',
  setRole: PropTypes.func,
};

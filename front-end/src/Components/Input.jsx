import PropTypes from 'prop-types';
import React from 'react';

const Input = ({
  type = 'text', className, placeholder, onChange, test, name, label,
}) => (
  <div style={ { width: '100%' } }>
    <label htmlFor={ `input_${label || name}` }>
      { label }
      <input
        id={ `input_${label || name}` }
        type={ type }
        className={ className || '' }
        name={ name }
        onChange={ onChange }
        data-testid={ test }
        placeholder={ placeholder || '' }
      />
    </label>
  </div>
);

Input.propTypes = {
  className: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  test: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default Input;

import React from 'react';
import PropTypes from 'prop-types';
import Context from '../context/Context';

const handleChange = (field, inputContext) => {
  const {
    setUserName,
    setUserEmail,
    setPassword,
    setSeller,
    seller,
  } = inputContext;
  switch (field.name) {
  case 'name':
    return setUserName(field.value);
  case 'email':
    return setUserEmail(field.value);
  case 'password':
    return setPassword(field.value);
  default:
    return setSeller(!seller);
  }
};

const Input = (props) => {
  const { i: { label, name, type, dataT, minLength, isReq } } = props;
  const inputContext = React.useContext(Context);
  return (
    <label htmlFor={ name } id={ `lbl${label}` }>
      {label}
      <input
        name={ name }
        type={ type }
        data-testid={ dataT }
        minLength={ minLength }
        required={ isReq }
        onChange={ (event) => handleChange(event.target, inputContext) }
      />
    </label>
  );
};

Input.propTypes = {
  i: PropTypes.objectOf({
    label: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    dataT: PropTypes.string,
    minLength: PropTypes.string,
    isReq: PropTypes.bool,
  }).isRequired,
};

export default Input;

import React from 'react';

const Button = (props) => {
  const { type, dataT, classBtn, bName, disabled } = props.b;
  
  return (
    <button
      type={type}
      data-testid={dataT}
      className={classBtn}
      disabled={disabled}
      onClick={() => props.click()}
    >
      {bName}
    </button>
  );
};
export default Button;

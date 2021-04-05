import React from 'react';
import PropTypes from 'prop-types';

export default function ClientCPMQtdInput(props) {
  const { index, product } = props;
  return (
    <div className="checkoutSpan">
      <span
        data-testid={ `${index}-product-qtd-input` }
      >
        { `Qtd: ${product.quantity}` }
      </span>
      <span
        data-testid={ `${index}-product-name` }
      >
        {product.name}
      </span>
    </div>
  );
}

ClientCPMQtdInput.propTypes = {
  product: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

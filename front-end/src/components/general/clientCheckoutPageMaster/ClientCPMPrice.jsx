import React from 'react';
import PropTypes from 'prop-types';

const two = 2;

export default function ClientCPMPrice(props) {
  const { index, product } = props;
  return (
    <div className="checkoutSpan">
      <span
        data-testid={ `${index}-product-unit-price` }
      >
        {`(R$ ${Number(product.price).toFixed(two).replace('.', ',')} un)`}
      </span>
      <span
        data-testid={ `${index}-product-total-value` }
        className="checkoutValue"
      >
        {` R$ ${((Number(product.price)) * (Number(product.quantity)))
          .toFixed(two).replace('.', ',')}`}
      </span>
    </div>
  );
}

ClientCPMPrice.propTypes = {
  product: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

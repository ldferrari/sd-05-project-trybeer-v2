import React from 'react';
import PropTypes from 'prop-types';

const dois = 2;

export default function AdminSDMapTotal(props) {
  const { product, index } = props;
  return (
    <div>
      <span data-testid={ `${index}-product-total-value` }>
        {`R$ ${product.total.toFixed(dois).replace('.', ',')}`}
      </span>
    </div>
  );
}

AdminSDMapTotal.propTypes = {
  product: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

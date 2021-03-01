import React from 'react';
import PropTypes from 'prop-types';

export default function ClientDOMapProduct(props) {
  const { index, product } = props;
  return (
    <div>
      <span data-testid={ `${index}-product-qtd` }>
        { `Qtd: ${product.quantity}` }
      </span>
    </div>
  );
}

ClientDOMapProduct.propTypes = {
  product: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

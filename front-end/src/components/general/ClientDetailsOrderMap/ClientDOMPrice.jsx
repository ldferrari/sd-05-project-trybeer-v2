import React from 'react';
import PropTypes from 'prop-types';

const dois = 2;

export default function ClientDOMapPrice(props) {
  const { index, product } = props;
  return (
    <div>
      <span data-testid={ `${index}-product-total-value` } className="datailValue">
        { `R$ ${product.total.toFixed(dois).replace('.', ',')}` }
      </span>
    </div>
  );
}

ClientDOMapPrice.propTypes = {
  product: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

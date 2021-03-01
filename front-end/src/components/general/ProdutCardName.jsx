import React from 'react';
import PropTypes from 'prop-types';

export default function ProdutCardName(props) {
  const { product, index } = props;
  return (
    <div data-testid={ `${index}-product-name` } className="cart-name">
      { product.name }
    </div>
  );
}

ProdutCardName.propTypes = {
  product: PropTypes.arrayOf(PropTypes.object).isRequired,
  index: PropTypes.string.isRequired,
};

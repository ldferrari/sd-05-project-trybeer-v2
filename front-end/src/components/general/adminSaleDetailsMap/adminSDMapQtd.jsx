import React from 'react';
import PropTypes from 'prop-types';

export default function AdminSDMapQtd(props) {
  const { product, index } = props;
  return (
    <div>
      <span data-testid={ `${index}-product-qtd` }>
        {`${product.quantity}`}
      </span>
    </div>
  );
}

AdminSDMapQtd.propTypes = {
  product: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

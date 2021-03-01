import React from 'react';
import PropTypes from 'prop-types';

export default function ClientDOMapName(props) {
  const { index, product } = props;
  return (
    <div>
      <span data-testid={ `${index}-product-name` }>
        { `${product.name}` }
      </span>
    </div>
  );
}

ClientDOMapName.propTypes = {
  product: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

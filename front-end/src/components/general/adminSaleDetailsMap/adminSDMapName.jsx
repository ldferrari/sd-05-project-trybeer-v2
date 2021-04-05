import React from 'react';
import PropTypes from 'prop-types';

export default function AdminSDMapName(props) {
  const { product, index } = props;
  return (
    <div>
      <span data-testid={ `${index}-product-name` }>
        {`${product.name}`}
      </span>
    </div>
  );
}

AdminSDMapName.propTypes = {
  product: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

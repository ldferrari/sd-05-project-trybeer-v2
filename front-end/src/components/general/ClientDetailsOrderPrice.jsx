import React from 'react';
import PropTypes from 'prop-types';

const zero = 0;
const dois = 2;

export default function ClientDetailsOrderPrice(props) {
  const { order } = props;
  return (
    <div>
      {order && (
        <div data-testid="order-total-value" className="detailsTotal">
          {`Total R$ ${order.products
            .reduce((total, product) => total + product.total, zero)
            .toFixed(dois)
            .replace('.', ',')}
          `}
        </div>
      )}
    </div>
  );
}

ClientDetailsOrderPrice.propTypes = {
  order: PropTypes.arrayOf(PropTypes.object).isRequired,
};

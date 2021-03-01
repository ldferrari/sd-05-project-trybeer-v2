import React from 'react';
import PropTypes from 'prop-types';

export default function AdminSaleDetailsPrice(props) {
  const { saleDetails } = props;
  return (
    <div data-testid="order-total-value" className="adminDetailsTotal">
      {saleDetails && (`Total: R$ ${saleDetails.products
        .reduce((acc, elem) => elem.total + acc, 0).toFixed(2).replace('.', ',')}`)}
    </div>
  );
}

AdminSaleDetailsPrice.propTypes = {
  saleDetails: PropTypes.arrayOf(PropTypes.object).isRequired,
};

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function CheckoutButton(props) {
  const { total } = props;

  return (
    <Link to="/checkout">
      <button data-testid="checkout-bottom-btn" type="button" disabled={ !total }>
        Ver Carrinho
      </button>
    </Link>
  );
}

CheckoutButton.propTypes = {
  total: PropTypes.string.isRequired,
};

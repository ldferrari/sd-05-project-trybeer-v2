import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const zero = 0;
const dois = 2;

export default function ClientProductPButton({ cart, cartItens }) {
  if (!cartItens) { cartItens = zero; }
  return (
    <div className="ver-carrinho">
      <Link to="/checkout" className="linkCar">
        <button
          type="button"
          data-testid="checkout-bottom-btn"
          className="buttonCart"
          disabled={ cartItens.length === zero || cartItens.length === null }
        >
          Ver Carrinho
          <span data-testid="checkout-bottom-btn-value" className="somaCart">
            {` R$ ${Number(cart).toFixed(dois).replace('.', ',')}`}
          </span>
        </button>
      </Link>
    </div>
  );
}

ClientProductPButton.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.object).isRequired,
  cartItens: PropTypes.arrayOf(PropTypes.object).isRequired,
};

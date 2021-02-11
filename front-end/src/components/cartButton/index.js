import React, { useContext, useEffect, useState } from 'react';
import propTypes from 'prop-types';
import AppContext from '../../context/AppContext';

function sumCartFunction(cart) {
  const zero = 0;
  return cart
  .reduce((acc, cv) => acc + cv.price * cv.quantity, zero)
  .toFixed(dois);
}

function ButtonCheckout(cartBtn,props, cartSum) {
  return (
    <button
      type="button"
      data-testid="checkout-bottom-btn"
      className="checkoutBtn"
      disabled={ !cartBtn }
      onClick={ () => props.history.push('/checkout') }
    >
      <p>Ver Carrinho</p>
      <p data-testid="checkout-bottom-btn-value">
        {`R$ ${cartSum.toString().replace('.', ',')}`}
      </p>
    </button>
  )
}

const CartButton = (props) => {
  const { cart } = useContext(AppContext);
  const [cartBtn, setCartBtn] = useState(false);
  const zero = 0;
  const cartSum = sumCartFunction(cart);
  useEffect(() => {
    if (cartSum > zero) {
      return setCartBtn(true);
    }
    return setCartBtn(false);
  },
  [cartSum]);
  return (ButtonCheckout(cartBtn,props, cartSum));
};

export default CartButton;

CartButton.propTypes = {
  history: propTypes.instanceOf(Object).isRequired,
};

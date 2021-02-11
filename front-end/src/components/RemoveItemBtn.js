import React from 'react';
import PropTypes from 'prop-types';

const removeItem = (e, index, setCartItems) => {
  e.preventDefault();
  const cartList = (JSON.parse(localStorage.getItem('cart')));
  cartList.splice(index, 1);
  setCartItems(cartList);
  localStorage.setItem('cart', JSON.stringify(cartList));
};

const RemoveItemBtn = ({ index, setCartItems }) => (
  <button
    type="button"
    data-testid={ `${index}-removal-button` }
    onClick={ (e) => removeItem(e, index, setCartItems) }
  >
    X
  </button>
);

export default RemoveItemBtn;

RemoveItemBtn.propTypes = {
  index: PropTypes.number,
  setCartItems: PropTypes.func,
};

RemoveItemBtn.defaultProps = {
  index: PropTypes.number,
  setCartItems: PropTypes.func,
};

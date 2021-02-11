import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../../context/AppContext';
import './index.css';

function CartItemQuantity(index, exists) {
  const zero = 0;
  return (
    <p data-testid={ `${index}-product-qtd-input` }>
      {exists.quantity ? exists.quantity : zero}
    </p>
  );
}
function CartItemUnitPrice(index, item) {
  return (
    <p data-testid={ `${index}-product-unit-price` }>
      {`(R$ ${item.price.toString().replace('.', ',')} un)`}
    </p>
  );
}
function CartItemTotalPrice(index, item) {
  const two = 2;
  return (
    <p data-testid={ `${index}-product-total-value` }>
      {`R$ ${(item.price * item.quantity).toFixed(two).replace('.', ',')}`}
    </p>
  );
}
function CartItemRemovalButton(index, exclude) {
  return (
    <button
      type="button"
      data-testid={ `${index}-removal-button` }
      onClick={ () => exclude() }
    >
      X
    </button>
  );
}
function excludeFunction(exists, cart, item, setCart) {
  const zero = 0;
  return () => {
    const itemZero = (e) => ({ ...e, quantity: zero });
    if (exists) {
      setCart(cart.map((e) => (e.id === item.id ? itemZero(e) : e)));
    }
    return null;
  };
}
const CartItem = (props) => {
  const { cart, setCart } = useContext(AppContext);
  const { item, index } = props;
  const exists = cart.find((produto) => produto.id === item.id);
  const zero = 0;
  if (!exists || exists.quantity === zero) { return null; }
  const exclude = excludeFunction(exists, cart, item, setCart);
  return (
    <div className="cartItem" key={ item.name }>
      {CartItemQuantity(index, exists)}
      <p data-testid={ `${index}-product-name` }>{item.name}</p>
      {CartItemUnitPrice(index, item)}
      {CartItemTotalPrice(index, item)}
      {CartItemRemovalButton(index, exclude)}
    </div>
  );
};

export default CartItem;

CartItem.propTypes = {
  item: PropTypes.instanceOf(Object).isRequired,
  index: PropTypes.number.isRequired,
};

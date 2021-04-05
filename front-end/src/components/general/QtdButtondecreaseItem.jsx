import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ClientContext } from '../../context/client/ClientProvider';

const initialQuantity = 0;
const negativo = -1;

const altQuantity = async (altQntItens, newQuantity) => {
  const { id, name, price, setCartItens, cartItens } = altQntItens;
  const prodIndex = cartItens.findIndex((i) => i.id === id);
  let newCartItens = cartItens;
  if (prodIndex !== negativo) {
    if (newQuantity === initialQuantity) {
      newCartItens.splice(prodIndex, 1);
    } else {
      newCartItens[prodIndex] = { id, quantity: newQuantity, name, price };
    }
    setCartItens(newCartItens);
  } else {
    newCartItens = [...cartItens, { id, quantity: newQuantity, name, price }];
    setCartItens([...cartItens, { id, quantity: newQuantity, name, price }]);
  }
  localStorage.setItem('cart itens', JSON.stringify(newCartItens));
};

function decreaseItem(objQtditens, altQntItens) {
  const { id, price, cartItens } = altQntItens;
  const { cart, setCart, updateCart } = objQtditens;
  let newQuantity;
  const newCartValue = cart - Number(price);
  const cartItensLocalStorage = cartItens.find((product) => product.id === id);
  if (cartItensLocalStorage && cartItensLocalStorage.quantity) {
    newQuantity = cartItensLocalStorage.quantity - 1;
  } else {
    newQuantity = negativo;
  }
  if (newQuantity >= initialQuantity) {
    altQuantity(altQntItens, newQuantity);
    setCart(newCartValue);
  }
  if (cart >= initialQuantity) {
    updateCart();
  }
}

export default function QtdButtondecreaseItem({ propsItens }) {
  const { cart, cartItens, setCart, setCartItens } = useContext(ClientContext);
  const { id, name, price, updateCart, index } = propsItens;
  const altQntItens = { id, name, price, setCartItens, cartItens };
  const objQtditens = { cart, setCart, updateCart };
  return (
    <button
      type="button"
      className="product-decrease-quantity"
      data-testid={ `${index}-product-minus` }
      onClick={ () => { decreaseItem(objQtditens, altQntItens); } }
    >
      -
    </button>
  );
}

QtdButtondecreaseItem.propTypes = {
  propsItens: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    index: PropTypes.number,
    cartProducts: PropTypes.arrayOf(PropTypes.object),
    updateCart: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { saveProductsLess } from '../services/localStorage';
import TrybeerContext from '../context/TrybeerContext';

function productInfo(index, item, quantity) {
  return (
    <div>
      <p data-testid={`${index}-product-qtd-input`}>{quantity}</p>
      <p data-testid={`${index}-product-name`}>{item.name}</p>
      <p data-testid={`${index}-product-total-value`}>
        {new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(quantity * item.price)}
      </p>
    </div>
  );
}

function unitPrice(index, item) {
  return (
    <p data-testid={`${index}-product-unit-price`}>
      (
      {new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(item.price)}{' '}
      un)
    </p>
  );
}

function btnLess(index, decreaseQuantity) {
  return (
    <button
      type="button"
      data-testid={`${index}-removal-button`}
      onClick={() => decreaseQuantity()}
    >
      -
    </button>
  );
}

export default function CheckoutCard(props) {
  const { index, item } = props;
  const [quantity, setQuantity] = useState(item.quantity);
  const { setTotalPrice, totalPrice } = useContext(TrybeerContext);
  const decreaseQuantity = () => {
    setQuantity(quantity - 1);
    saveProductsLess(item);
    setTotalPrice(totalPrice - Number(item.price));
  };
  return (
    <div>
      {productInfo(index, item, quantity)}
      {unitPrice(index, item)}
      {btnLess(index, decreaseQuantity)}
    </div>
  );
}

CheckoutCard.propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.shape({
    quantity: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ClientContext } from '../../../context/client/ClientProvider';

const zero = 0;

const removeProduct = (itens) => {
  const { index, cartItens, setCart, setCartItens } = itens;
  const newCartItens = cartItens.filter((item, i) => i !== index);
  const newCart = newCartItens
    .reduce((acc, elem) => acc + ((Number(elem.price) * Number(elem.quantity))), zero);
  localStorage.setItem('cart itens', JSON.stringify(newCartItens));
  localStorage.setItem('cart', (newCart));
  setCartItens(newCartItens);
  setCart(newCart);
};

export default function ClientCPMButtonX(props) {
  const { index } = props;
  const { cartItens, setCart, setCartItens } = useContext(ClientContext);
  const itens = { index, cartItens, setCart, setCartItens };
  return (
    <div>
      <button
        data-testid={ `${index}-removal-button` }
        type="button"
        className="checkoutButton"
        onClick={ () => removeProduct(itens) }
      >
        X
      </button>
    </div>
  );
}

ClientCPMButtonX.propTypes = {
  index: PropTypes.number.isRequired,
};

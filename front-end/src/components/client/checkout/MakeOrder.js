import React, { useContext } from 'react';
import CheckoutContext from '../../../context/CheckoutContext';
import TrybeerContext from '../../../context/TrybeerContext';
import { createNewSale } from '../../../services/fetch';

function finishOrder(user, totalPrice, street, houseNum, date, products, handleResult) {
  const initialState = 0;
  return (
    <button
      type="button"
      data-testid="checkout-finish-btn"
      disabled={totalPrice === initialState || houseNum === initialState || street === ''}
      onClick={() => {
        createNewSale(
          user.email,
          totalPrice,
          street,
          houseNum,
          date,
          products
        ).then((result) => handleResult(result));
      }}
    >
      Finalizar pedido
    </button>
  );
}

function MakeOrder() {
  const { totalPrice, houseNum, street } = useContext(TrybeerContext);
  const { setStatusSale } = useContext(CheckoutContext);
  const user = JSON.parse(localStorage.getItem('user'));
  const products = JSON.parse(localStorage.getItem('cart'));
  const day = new Date().getDate();
  const zero = 0;
  const month = new Date().getMonth() === zero ? '01' : new Date().getMonth();
  const year = new Date().getFullYear();
  const date = `${day}/${month}/${year}`;
  const handleResult = (result) => {
    const time = 1000;
    if (result.message === 'Created') {
      document.getElementById('sucess').innerHTML = 'Compra realizada com sucesso!';
      setTimeout(() => {
        setStatusSale(true);
      }, time);
    }
  };
  return (
    <section>
      {finishOrder(user, totalPrice, street, houseNum, date, products, handleResult)}
      <div id="sucess" />
    </section>
  );
}

export default MakeOrder;

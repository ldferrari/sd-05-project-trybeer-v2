import React, { useContext } from 'react';
import CheckoutContext from '../../../context/CheckoutContext';
import TrybeerContext from '../../../context/TrybeerContext';
import { createNewSale } from '../../../services/fetch';

function finishOrder(totalPrice, street, houseNum, handleResult) {
  const user = JSON.parse(localStorage.getItem('user'));
  const initialState = 0;
  const products = JSON.parse(localStorage.getItem('cart'));
  const month = new Date().getMonth() === initialState ? '01' : new Date().getMonth();
  const date = `${new Date().getDate()}/${month}/${new Date().getFullYear()}`;
  return (
    <button
      type="button"
      data-testid="checkout-finish-btn"
      disabled={ totalPrice === initialState || houseNum === initialState || !street }
      onClick={ () => {
        createNewSale(user.email, totalPrice, street, houseNum, date, products).then((result) => handleResult(result));
      } }
    >
      Finalizar pedido
    </button>
  );
}
// const allInfo = { totalPrice, street, houseNum, date, products };
// createNewSale(user.email, allInfo).then((result) => handleResult(result));

function MakeOrder() {
  const { totalPrice } = useContext(TrybeerContext);
  const { setStatusSale, houseNum, street } = useContext(CheckoutContext);
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
      {finishOrder(totalPrice, street, houseNum, handleResult)}
      <div id="sucess" />
    </section>
  );
}

export default MakeOrder;

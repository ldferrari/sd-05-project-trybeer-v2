import React, { useContext, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import TrybeerContext from '../../context/TrybeerContext';
import CheckoutContext from '../../context/CheckoutContext';
import ClientMenu from '../../components/client/ClientMenu';
import CheckoutCard from '../../components/checkoutCard';
import StreetInput from '../../components/client/checkout/StreetInput';
import HouseInput from '../../components/client/checkout/HouseInput';
import MakeOrder from '../../components/client/checkout/MakeOrder';
import '../../css/client/checkout.css';

function showProducts(totalPrice) {
  const products = JSON.parse(localStorage.getItem('cart'));
  return (
    <section>
       {!totalPrice && <h2>Não há produtos no carrinho</h2>}
      {totalPrice && (
        <div className="orders-list">
          { products.map((item, index) => (
            <CheckoutCard item={ item } index={ index } key={ item } />
          )) }
        </div>
      )}
    </section>
  )
}

function showTotal(totalPrice) {
  return (
    <p data-testid="order-total-value">
        Total:
        {' '}
        {new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(totalPrice)}
    </p>
  );
}

function Checkout() {
  const [isLogged, setIsLogged] = useState(true);
  const { statusSale } = useContext(CheckoutContext);
  const { totalPrice } = useContext(TrybeerContext);
  useEffect(() => {
    if (localStorage.getItem('user') === null) setIsLogged(false);
  }, []);
  return (
    <div>
      <ClientMenu data-testid="top-title" title="Finalizar pedido" />
      <h3>Produtos</h3>
      { showProducts(totalPrice) }
      { showTotal(totalPrice) }
      <div className="address">
        <StreetInput />
        <HouseInput />
      </div>
      <MakeOrder />
      {statusSale && <Redirect to="/products" />}
      {!isLogged && <Redirect to="/login" />}
    </div>
  );
}

export default Checkout;

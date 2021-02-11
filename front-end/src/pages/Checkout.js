import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import TryBeerContext from '../context/TryBeerContext';

import Header from '../components/Header';
import InputStreet from '../components/InputStreet';
import InputNumber from '../components/InputNumber';
import ProductCard from '../components/ProductCard';
import FinishOrderBtn from '../components/FinishOrderBtn';

const noValue = 0;
const decimals = 2;

const priceCart = JSON.parse(localStorage.getItem('cart')) || [];
const reducer = (sum, product) => sum + (+product.quantity * +product.price);
const totalPrice = priceCart.reduce(reducer, noValue);

const userData = JSON.parse(localStorage.getItem('user'));
const role = userData && userData.user && userData.user.role;
const token = userData && userData.token;

const detailsOrder = (cartItems, setCartItems) => (
  <>
    <h5>Produtos</h5>
    <ProductCard { ...{ cartItems, setCartItems } } />
    <span>{totalPrice === noValue ? 'Não há produtos no carrinho' : ''}</span>
    <h5 data-testid="order-total-value">
      {`Total: R$ ${totalPrice.toFixed(decimals).replace('.', ',')}`}
    </h5>
  </>
);

const Checkout = () => {
  const { success } = useContext(TryBeerContext);
  const cartStored = JSON.parse(localStorage.getItem('cart'));
  const [cartItems, setCartItems] = useState(cartStored || []);

  if (!token) return <Redirect to="/login" />;
  return (
    <section>
      <Header title={ role === 'client' ? 'Meu perfil' : 'Perfil' } />
      {detailsOrder(cartItems, setCartItems)}
      <form>
        <InputStreet />
        <InputNumber />
        <FinishOrderBtn />
      </form>
      <span>{success && 'Compra realizada com sucesso!'}</span>
    </section>
  );
};

export default Checkout;

import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import TryBeerContext from '../context/TryBeerContext';
import { placeOrder } from '../services/ApiTrybeer';
import Header from '../components/Header';
import InputStreet from '../components/InputStreet';
import InputNumber from '../components/InputNumber';
// import ProductCard from '../components/ProductCard';
// import RemoveItemBtn from '../components/RemoveItemBtn';
// import FinishOrderBtn from '../components/FinishOrderBtn';

const noValue = 0;
const decimals = 2;
const delayTime = 300000;

const userData = JSON.parse(localStorage.getItem('user'));
const role = userData && userData.user && userData.user.role;

const date = new Date();
const month = date.getUTCMonth() + 1;
const day = date.getUTCDate();
const year = date.getUTCFullYear();
const saleDate = `${year}-${month}-${day}`;

const reducer = (sum, product) => sum + (+product.quantity * +product.price);

const removeItem = (e, index, setCartItems) => {
  e.preventDefault();
  const cartList = (JSON.parse(localStorage.getItem('cart')));
  cartList.splice(index, 1);
  setCartItems(cartList);
  localStorage.setItem('cart', JSON.stringify(cartList));
  const updatePrice = cartList.reduce(reducer, noValue);
  localStorage.setItem('totalPrice', JSON.stringify(updatePrice));
};

const removeItemBtn = (index, setCartItems) => (
  <button
    type="button"
    data-testid={ `${index}-removal-button` }
    onClick={ (e) => removeItem(e, index, setCartItems) }
  >
    X
  </button>
);

const productCard = (cartItems, setCartItems) => (
  <>
    {cartItems.map((item, index) => (
      <>
        <img src={ item.url_image } loading="lazy" alt={ item.name } height="200" />
        <h5 data-testid={ `${index}-product-qtd-input` }>{item.quantity}</h5>
        <h5 data-testid={ `${index}-product-name` }>{item.name}</h5>
        <h5 data-testid={ `${index}-product-total-value` }>
          {`R$ ${(+item.quantity * +item.price).toFixed(decimals).replace('.', ',')}`}
        </h5>
        <h5 data-testid={ `${index}-product-unit-price` }>
          {`(R$ ${(item.price).replace('.', ',')} un)`}
        </h5>
        {removeItemBtn(index, setCartItems)}
      </>
    ))}
  </>
);

const detailsOrder = (priceCart, cartItems, setCartItems) => {
  const totalPrice = priceCart.reduce(reducer, noValue);
  return (
    <>
      <h5>Produtos</h5>
      {productCard(cartItems, setCartItems)}
      <span>{totalPrice === noValue ? 'Não há produtos no carrinho' : ''}</span>
      <h5 data-testid="order-total-value">
        {`Total: R$ ${totalPrice.toFixed(decimals).replace('.', ',')}`}
      </h5>
    </>
  );
};

const handleClick = (e, handleParams) => {
  const {
    email, totalPrice, success, setSuccess, streetName, houseNumber, history,
  } = handleParams;
  const goToProducts = () => history.push('/products');
  const orderData = {
    email, totalPrice, streetName, houseNumber, saleDate };

  e.preventDefault();
  placeOrder(orderData);
  setSuccess(!success);
  setTimeout(goToProducts, delayTime);
};

const finishOrderBtn = (priceCart, finishParams) => {
  const { email, history, streetName, houseNumber, success, setSuccess } = finishParams;
  const totalPrice = priceCart.reduce(reducer, noValue);
  const handleParams = {
    email, totalPrice, streetName, houseNumber, history, success, setSuccess };

  return (
    <button
      type="submit"
      disabled={ !streetName || !houseNumber || totalPrice
        .toFixed(decimals).replace('.', ',') <= noValue }
      data-testid="checkout-finish-btn"
      onClick={ (event) => {
        handleClick(event, handleParams);
      } }
    >
      Finalizar Pedido
    </button>
  );
};

const inputFields = () => (
  <>
    <InputStreet />
    <InputNumber />
  </>
);
const Checkout = () => {
  const {
    email, streetName, houseNumber, success, setSuccess } = useContext(TryBeerContext);
  const cartStored = JSON.parse(localStorage.getItem('cart'));
  const [cartItems, setCartItems] = useState(cartStored || []);
  const history = useHistory();
  const finishParams = { email, history, streetName, houseNumber, success, setSuccess };
  const priceCart = JSON.parse(localStorage.getItem('cart')) || [];

  return (
    <section>
      <Header title={ role === 'client' ? 'Meu perfil' : 'Perfil' } />
      {detailsOrder(priceCart, cartItems, setCartItems)}
      {inputFields()}
      {finishOrderBtn(priceCart, finishParams)}
      <span>{success && 'Compra realizada com sucesso!'}</span>
    </section>
  );
};

export default Checkout;

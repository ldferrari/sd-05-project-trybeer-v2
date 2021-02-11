import React, { useContext, useState, useEffect } from 'react';
import propTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import './index.css';
import AppContext from '../../context/AppContext';
import Header from '../../components/header';
import Footer from '../../components/footer';
import CartItem from '../../components/cartItem';
import { postOrder } from '../../services/requestAPI';

function calcSumCart(cart) {
  const zero = 0;
  const dois = 2;
  return cart.reduce((acc, cv) => acc + cv.price * cv.quantity, zero).toFixed(dois);
}

function inUseEffect(history) {
  const el = document.getElementById('compra-finalizada');
  if (el && el.innerHTML !== '') {
    history.push('/products');
  }
}
function handleSubmitFunction({ rua, numero, cart, setAlertCompraFinalizada, setCart }) {
  const zero = 0;
  return async () => {
    const token = localStorage.getItem('token');
    const userData = { deliveryAddress: rua, deliveryNumber: numero };
    await postOrder(
      token,
      cart.filter((e) => e.quantity > zero),
      userData,
    );
    localStorage.removeItem('cart');
    setCart([]);
    setAlertCompraFinalizada('Compra realizada com sucesso!');
    // <Redirect to="/products" />
    // tempo = setTimeout(() => {
    // }, tempoEspera);
    return true; // handleHandleSubmit
  };
}
function Legenda() {
  return (
    <div className="legenda">
      <p>QUANTIDADE</p>
      <p>PRODUTO</p>
      <p>PREÇO</p>
      <p>TOTAL</p>
      <p>EXCLUIR </p>
    </div>
  );
}
function CartItemsRender(cartHere) {
  return (
    <div className="cartItems">
      {cartHere.map((item, index) => (
        <CartItem key={ item.id } item={ item } index={ index } />
      ))}
    </div>
  );
}

function InputRua(setRua) {
  return (
    <div className="inputs">
      <h4>Rua</h4>
      <input
        data-testid="checkout-street-input"
        type="text"
        name="rua"
        onChange={ ({ target: { value } }) => setRua(value) }
        /* value={ rua } */
      />
    </div>
  );
}
function InputNumber(setNumero) {
  return (
    <div className="inputs">
      <h4>Número</h4>
      <input
        data-testid="checkout-house-number-input"
        type="number"
        name="numero"
        onChange={ ({ target: { value } }) => setNumero(Number(value)) }
        /* value={ numero } */
      />
    </div>
  );
}
function ButtonSubmit(rua, numero, fullCart, handleSubmit) {
  return (
    <button
      // type="button"
      data-testid="checkout-finish-btn"
      className="finishBtn"
      type="submit"
      disabled={ !(rua && numero && fullCart) }
      onClick={ handleSubmit }
    >
      Finalizar Pedido
    </button>
  );
}
function Render1({ cartHere }) {
  return (
    <div className="pedido">
      <h2 className="checkoutitle">Produtos no carrinho:</h2>
      {Legenda()}
      {CartItemsRender(cartHere)}
    </div>
  );
}
function Render2({ setRua, setNumero }) {
  return (
    <div className="deliveryForm">
      <h2 className="checkoutitle">Endereço de entrega:</h2>
      {InputRua(setRua)}
      {InputNumber(setNumero)}
    </div>
  );
}
function RenderFinal(param) {
  const { rua, numero, fullCart, handleSubmit, alertCompraFinalizada, cartSum } = param;
  const zero = 0;
  return (
    <div className="Checkout">
      <Header>Finalizar Pedido</Header>
      <span id="compra-finalizada">{alertCompraFinalizada}</span>
      {Render1(param)}
      <p data-testid="order-total-value" className="total">
        {`TOTAL: R$ ${cartSum.toString().replace('.', ',')}`}
      </p>
      {Number(cartSum) === zero ? <h1>Não há produtos no carrinho</h1> : null}
      {Render2(param)}
      {ButtonSubmit(rua, numero, fullCart, handleSubmit)}
      <Footer />
    </div>
  );
}
const Checkout = (props) => {
  const [cartHere, setCartHere] = useState([]);
  const [rua, setRua] = useState();
  const [numero, setNumero] = useState();
  const { history } = props;
  const { cart, setCart, alertCompraFinalizada, setAlertCompraFinalizada } = useContext(
    AppContext,
  );
  const zero = 0;
  const cartSum = calcSumCart(cart);
  const fullCart = cartSum > zero;
  useEffect(() => { setCartHere(cart); }, [cart]);
  useEffect(() => { inUseEffect(history); }, [alertCompraFinalizada, history]);
  if (!localStorage.getItem('token')) { return <Redirect to="/login" />; }
  const obj1 = { rua, numero, cart, setAlertCompraFinalizada, setCart };
  const handleSubmit = handleSubmitFunction(obj1);
  const obj2 = { cartHere, cartSum, setRua, setNumero };
  const obj3 = { rua, numero, fullCart, handleSubmit, alertCompraFinalizada };
  return RenderFinal({ ...obj2, ...obj3 });
};

export default Checkout;

Checkout.propTypes = {
  history: propTypes.instanceOf(Object).isRequired,
};

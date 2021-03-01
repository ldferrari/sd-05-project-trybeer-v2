import React, { useContext } from 'react';
import fetchSalesData from '../../../../services/client/fetchSalesData';
import { ClientContext } from '../../../../context/client/ClientProvider';

const zero = 0;
const twoSeconds = 2000;

const handleClick = async (BItens) => {
  const userData = JSON.parse(localStorage.getItem('user'));
  const { setRedirect, cart, street, streetNumber, cartItens, setPurchaseDone } = BItens;
  const salesData = {
    userId: userData.id,
    totalPrice: cart,
    deliveryAddress: street,
    deliveryNumber: streetNumber,
    cart: cartItens,
  };
  await fetchSalesData(salesData);
  setPurchaseDone(true);
  setTimeout(() => setRedirect(true), twoSeconds);
};

const clearData = (setCartItens, setCart) => {
  setCartItens([]);
  setCart(0);
  localStorage.removeItem('cart itens');
  localStorage.removeItem('cart');
};

export default function ClientCPMButton() {
  const { streetNumber, setPurchaseDone, setCartItens } = useContext(ClientContext);
  const { cart, cartItens, setRedirect, street, setCart } = useContext(ClientContext);
  const BItens = { setRedirect, cart, street, streetNumber, cartItens, setPurchaseDone };
  return (
    <div>
      <button
        data-testid="checkout-finish-btn"
        className="chekcoutFinish"
        type="button"
        disabled={ (cart === zero) || (street === '') || (streetNumber === '') }
        onClick={ () => { handleClick(BItens); clearData(setCartItens, setCart); } }
      >
        Finalizar Pedido
      </button>
    </div>
  );
}

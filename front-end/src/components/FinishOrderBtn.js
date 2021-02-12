// import React, { useContext } from 'react';
// import { useHistory } from 'react-router-dom';
// import TryBeerContext from '../context/TryBeerContext';
// import { placeOrder } from '../services/ApiTrybeer';

// const noValue = 0;
// const decimals = 2;
// const delayTime = 1500;

// const priceCart = JSON.parse(localStorage.getItem('cart')) || [];
// const reducer = (sum, product) => sum + (+product.quantity * +product.price);
// const totalPrice = priceCart.reduce(reducer, noValue);

// const userData = JSON.parse(localStorage.getItem('user'));
// const email = userData && userData.user && userData.user.email;

// const handleClick = (e, handleParams) => {
//   const {
//     success, setSuccess, streetName, houseNumber, saleDate, history,
//   } = handleParams;
//   const goToProducts = () => history.push('/products');
//   const orderData = { email, totalPrice, streetName, houseNumber, saleDate };

//   e.preventDefault();
//   placeOrder(orderData);
//   setSuccess(!success);
//   setTimeout(goToProducts, delayTime);
// };

// const date = new Date();
// const month = date.getUTCMonth() + 1;
// const day = date.getUTCDate();
// const year = date.getUTCFullYear();
// const saleDate = `${year}-${month}-${day}`;

// const FinishOrderBtn = () => {
//   const { streetName, houseNumber, success, setSuccess } = useContext(TryBeerContext);
//   const history = useHistory();
//   const handleParams = {
//     email, totalPrice, streetName, houseNumber, saleDate, history, success, setSuccess };

//   return (
//     <button
//       type="submit"
//       disabled={ !streetName || !houseNumber || totalPrice
//         .toFixed(decimals).replace('.', ',') <= noValue }
//       data-testid="checkout-finish-btn"
//       onClick={ (event) => {
//         handleClick(event, handleParams);
//       } }
//     >
//       Finalizar Pedido
//     </button>
//   );
// };

// export default FinishOrderBtn;

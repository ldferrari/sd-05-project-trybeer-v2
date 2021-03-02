// import React, { useContext } from 'react';
// import PropTypes from 'prop-types';
// import TryBeerContext from '../context/TryBeerContext';

// const decimals = 2;

// function reais(products, index) {
//   return (products[index].price * products[index].quantity)
//     .toFixed(decimals)
//     .replace('.', ',');
// }

// export default function OrderInformation(props) {
//   const { products, index } = props;
//   const { orderStatus } = useContext(TryBeerContext);

//   return (
//     <section>
//       <h3 data-testid={ `${index}-product-name` }>
//         {products[index] && products[index].name}
//       </h3>
//       <span>{products[index] && `R$ ${products[index].price}`}</span>
//       <span data-testid={ `${index}-product-qtd` }>
//         {products[index] && products[index].quantity}
//       </span>
//       <span data-testid={ `${index}-product-total-value` }>
//         {products[index] && `R$ ${reais(products, index)}`}
//       </span>
//       <span data-testid={ `${index}-order-status` }>{orderStatus}</span>
//     </section>
//   );
// }

// OrderInformation.propTypes = {
//   index: PropTypes.number.isRequired,
// };

// import React from 'react';
// import PropTypes from 'prop-types';
// import RemoveItemBtn from './RemoveItemBtn';

// const decimals = 2;

// const ProductCard = ({ cartItems, setCartItems }) => (
//   <>
//     {cartItems.map((item, index) => (
//       <>
//         <h5 data-testid={ `${index}-product-qtd-input` }>
//           {(JSON.parse(localStorage.getItem('cart'))[index].quantity)}
//         </h5>
//         <h5 data-testid={ `${index}-product-qtd-input` }>{item.quantity}</h5>
//         <h5 data-testid={ `${index}-product-name` }>{item.name}</h5>
//         <h5 data-testid={ `${index}-product-total-value` }>
//           {`R$ ${(+item.quantity * +item.price).toFixed(decimals).replace('.', ',')}`}
//         </h5>
//         <h5 data-testid={ `${index}-product-unit-price` }>
//           {`(R$ ${(item.price).replace('.', ',')} un)`}
//         </h5>
//         <RemoveItemBtn { ...{ index, setCartItems } } />
//       </>
//     ))}
//   </>
// );

// export default ProductCard;

// ProductCard.propTypes = {
//   cartItems: PropTypes.node.isRequired,
//   setCartItems: PropTypes.func.isRequired,
// };

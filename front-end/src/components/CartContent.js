// import React from 'react';

// const DefaultContent = (total) => (
//   <div>
//     <h1>Não há produtos no carrinho</h1>
//     <div data-testid="order-total-value">
//       { `R$ ${total.toFixed(two).replace('.', ',')}` }
//     </div>
//   </div>
// );

// const Content = (storage) => (
//   {storage.map((product, index) => (
//     <div key={ product.name }>
//       <div data-testid={ `${index}-product-name` }>{ product.name }</div>
//       <div data-testid={ `${index}-product-qtd-input` }>{ product.qty }</div>
//       <div data-testid={ `${index}-product-unit-price` }>
//         {`(R$ ${product.price.toFixed(two).replace('.', ',')} un)` }
//       </div>
//       <div data-testid={ `${index}-product-total-value` }>
//         {`R$ ${(product.price * product.qty).toFixed(two).replace('.', ',')}`}
//       </div>
//       <button
//         type="button"
//         data-testid={ `${index}-removal-button` }
//         onClick={ () => removeFromCart(index) }
//       >
//         X
//       </button>
//     </div>
//   ))}
// )

// const HasContent = (storage) => (
//   <div>
//     {Content(storage)}
//     <div data-testid="order-total-value">
//       { `R$ ${total.toFixed(two).replace('.', ',')}` }
//     </div>
//   </div>
// )

// export default CartContent = ({ storage, total }) => (
//   storage.length ? HasContent(storage) : DefaultContent(total)
// )

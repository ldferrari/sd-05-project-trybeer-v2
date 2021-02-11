import React from 'react';
import PropTypes from 'prop-types';

const products = JSON.parse(localStorage.getItem('cart'));
const decimals = 2;

export default function OrderInformation(props) {
  const { index } = props;

  return (
    <section>
      <h3 data-testid={ `${index}-product-name` }>
        {products[index] && products[index].name}
      </h3>
      <span>{products[index] && `R$ ${products[index].price}`}</span>
      <span data-testid={ `${index}-product-qtd` }>
        {products[index] && products[index].quantity}
      </span>
      <span data-testid={ `${index}-product-total-value` }>
        {products[index] && `R$ ${(products[index].price * products[index].quantity)
          .toFixed(decimals)
          .replace('.', ',')}`}
      </span>
    </section>
  );
}

OrderInformation.propTypes = {
  index: PropTypes.number.isRequired,
};

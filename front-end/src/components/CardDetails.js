import React from 'react';
import PropTypes from 'prop-types';

import CardDetailsButtons from './CardDetailsButtons';

export default function CardDetails(props) {
  const { index, product, quantity, addData, removeData } = props;
  const reais = product.price.replace('.', ',');

  return (
    <section className="product-card">
      <img data-testid={ `${index}-product-img` } src={ product.url_image } alt="Beer" />
      <h3 data-testid={ `${index}-product-name` }>{product.name}</h3>
      <span data-testid={ `${index}-product-price` }>{`R$ ${reais}`}</span>
      <CardDetailsButtons
        index={ index }
        quantity={ quantity }
        addData={ addData }
        removeData={ removeData }
      />
    </section>
  );
}

CardDetails.propTypes = {
  index: PropTypes.number.isRequired,
  product: PropTypes.instanceOf(Object).isRequired,
  quantity: PropTypes.number.isRequired,
  addData: PropTypes.instanceOf(Object).isRequired,
  removeData: PropTypes.instanceOf(Object).isRequired,
};

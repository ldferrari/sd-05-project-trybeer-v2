import React from 'react';
import PropTypes from 'prop-types';

import { addProduct, removeProduct } from '../services/helpers';

export default function CardDetails(props) {
  const { index, product, quantity, addData, removeData } = props;

  return (
    <section className="product-card">
      <img
        data-testid={ `${index}-product-img` }
        src={ product.url_image }
        alt="Beer"
        width="100px"
      />
      <h3 data-testid={ `${index}-product-name` }>{product.name}</h3>
      <span data-testid={ `${index}-product-price` }>
        {`R$ ${product.price.replace('.', ',')}`}
      </span>
      <button
        data-testid={ `${index}-product-minus` }
        type="button"
        onClick={ () => removeProduct(removeData) }
      >
        -
      </button>
      <span data-testid={ `${index}-product-qtd` }>{quantity}</span>
      <button
        data-testid={ `${index}-product-plus` }
        type="button"
        onClick={ () => addProduct(addData) }
      >
        +
      </button>
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

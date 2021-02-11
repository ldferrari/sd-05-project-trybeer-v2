import React from 'react';
import PropTypes from 'prop-types';

import { addProduct, removeProduct } from '../services/helpers';

export default function CardDetailsButtons(props) {
  const { index, quantity, addData, removeData } = props;

  return (
    <section>
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

CardDetailsButtons.propTypes = {
  index: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  addData: PropTypes.instanceOf(Object).isRequired,
  removeData: PropTypes.instanceOf(Object).isRequired,
};

import React from 'react';
import PropTypes from 'prop-types';

import { addProduct, removeProduct } from '../services/helpers';

function minusBtn(index, removeData) {
  return (
    <button
      data-testid={ `${index}-product-minus` }
      type="button"
      onClick={ () => removeProduct(removeData) }
    >
      -
    </button>
  );
}

function plusBtn(index, addData) {
  return (
    <button
      data-testid={ `${index}-product-plus` }
      type="button"
      onClick={ () => addProduct(addData) }
    >
      +
    </button>
  );
}

export default function CardDetailsButtons(props) {
  const { index, quantity, addData, removeData } = props;

  return (
    <section>
      {minusBtn(index, removeData)}
      <span data-testid={ `${index}-product-qtd` }>{quantity}</span>
      {plusBtn(index, addData)}
    </section>
  );
}

CardDetailsButtons.propTypes = {
  index: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  addData: PropTypes.instanceOf(Object).isRequired,
  removeData: PropTypes.instanceOf(Object).isRequired,
};

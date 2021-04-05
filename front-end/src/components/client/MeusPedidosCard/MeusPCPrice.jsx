import React from 'react';
import PropTypes from 'prop-types';

export default function MeusPCPrice(props) {
  const { index, order } = props;
  return (
    <div data-testid={ `${index}-order-total-value` } className="valueMeuPedido">
      { `R$ ${order.total_price.toString().replace('.', ',')}` }
    </div>
  );
}

MeusPCPrice.propTypes = {
  order: PropTypes.arrayOf(PropTypes.object).isRequired,
  index: PropTypes.number.isRequired,
};

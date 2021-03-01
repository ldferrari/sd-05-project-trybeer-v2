import React from 'react';
import PropTypes from 'prop-types';

export default function MeusPCId(props) {
  const { index, order } = props;
  return (
    <div data-testid={ `${index}-order-number` }>
      { `Pedido ${order.id}` }
    </div>
  );
}

MeusPCId.propTypes = {
  order: PropTypes.arrayOf(PropTypes.object).isRequired,
  index: PropTypes.number.isRequired,
};

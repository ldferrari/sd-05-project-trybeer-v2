import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function ClientOrderLink(props) {
  const { order, index } = props;

  return (
    <Link className="order-link" to={ `/orders/${order.id}` }>
      <span data-testid={ `${index}-order-number` }>{ `Pedido ${order.id}` }</span>
      <p data-testid={ `${index}-order-total-value` }>
        { `R$ ${order.total_price.replace('.', ',')}` }
      </p>
      <p data-testid={ `${index}-order-date` }>
        { `${new Date(order.sale_date).toLocaleDateString('pt-br', {
          day: '2-digit',
          month: '2-digit',
        })}` }
      </p>
    </Link>
  );
}

ClientOrderLink.propTypes = {
  order: PropTypes.instanceOf(Object).isRequired,
  index: PropTypes.number.isRequired,
};

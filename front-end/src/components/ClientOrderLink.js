import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function ClientOrderLink(props) {
  const { order, index } = props;
  const total = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <Link className="order-link" to={ `/orders/${order.id}` }>
      <span data-testid={ `${index}-order-number` }>{ `Pedido ${order.id}` }</span>
      <p data-testid={ `${index}-order-total-value` }>
        { `${total.format(order.total_price)}` }
      </p>
      <p data-testid={ `${index}-order-date` }>
        { `${new Date(order.sale_date).toLocaleDateString('pt-br', {
          day: '2-digit',
          month: '2-digit',
        })}` }
      </p>
      <span data-testid={ `${index}-order-status` }>{order.status}</span>
    </Link>
  );
}

ClientOrderLink.propTypes = {
  order: PropTypes.instanceOf(Object).isRequired,
  index: PropTypes.number.isRequired,
};

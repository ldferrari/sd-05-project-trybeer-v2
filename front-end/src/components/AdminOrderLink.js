import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function AdminOrderLink(props) {
  const { order, index } = props;
  const total = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <Link to={ `/admin/orders/${order.id}` }>
      <span data-testid={ `${index}-order-number` }>{`Pedido ${order.id}`}</span>
      <span data-testid={ `${index}-order-address` }>
        { `${order.delivery_address}, ${order.delivery_number}` }
      </span>
      <span data-testid={ `${index}-order-total-value` }>
        { `${total.format(order.total_price)}` }
      </span>
      <span data-testid={ `${index}-order-status` }>{order.status}</span>
    </Link>
  );
}

AdminOrderLink.propTypes = {
  order: PropTypes.instanceOf(Object).isRequired,
  index: PropTypes.number.isRequired,
};

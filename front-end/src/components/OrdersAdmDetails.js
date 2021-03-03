import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { updateStatus, getAdmOrderById } from '../services/api';
import Header from './Header';

const OrdersAdminDetails = (props) => {
  const zero = 0;
  const two = 2;
  const {
    match: {
      params: { id },
    },
  } = props;
  const [order, setOrder] = useState([]);
  const [totalPrice, setTotalPrice] = useState([]);
  const [status, setStatus] = useState('Pendente');
  const { role, token } = localStorage;

  useEffect(() => {
    getAdmOrderById(role, id, token).then((sale) => {
      setTotalPrice(sale[0].total_price);
      setOrder(sale[0].sale_products);
    });
  }, []); // eslint-disable-line

  const handleClick = (orderStatus) => {
    updateStatus(role, id, token, orderStatus).then(() => setStatus(orderStatus));
  };

  return (
    <div>
      <Header>Menu</Header>
      <table>
        <caption data-testid="order-number">{ `Pedido ${id}` }</caption>
        <span data-testid="order-status">{ `${status}` }</span>
        <tr>
          <th>Product</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total price</th>
        </tr>
        {order.map((p, index) => (
          <tr key={ p.product.name }>
            <td data-testid={ `${index}-product-name` }>{ p.product.name }</td>
            <td data-testid={ `${index}-order-unit-price` }>
              { `(R$ ${String(p.product.price).replace('.', ',')})` }
            </td>
            <td data-testid={ `${index}-product-qtd` }>{ p.quantity }</td>
            <td data-testid={ `${index}-product-total-value` }>
              { `R$ ${(p.product.price * p.quantity)
                .toFixed(two)
                .replace('.', ',')}` }
            </td>
          </tr>
        ))}
      </table>
      <p data-testid="order-total-value">
        { totalPrice ? `R$ ${String(totalPrice).replace('.', ',')}` : zero }
      </p>
      {status === 'Pendente' ? (
        <button
          type="button"
          data-testid="mark-as-delivered-btn"
          onClick={ () => handleClick('Entregue') }
        >
          Marcar como entregue
        </button>
      ) : (
        zero
      )}
      <button
        type="button"
        data-testid="mark-as-prepared-btn"
        onClick={ () => handleClick('Preparando') }
      >
        Preparar pedido
      </button>
    </div>
  );
};

OrdersAdminDetails.propTypes = {
  match: PropTypes.number.isRequired,
  params: PropTypes.number.isRequired,
};
export default OrdersAdminDetails;

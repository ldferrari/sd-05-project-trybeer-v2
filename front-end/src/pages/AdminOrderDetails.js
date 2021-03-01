import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Header from '../components/Header';
import TryBeerContext from '../context/TryBeerContext';

function AdminOrderDetails(props) {
  const [orderDetails, setOrderDetails] = useState([]);
  const { orderStatus, setOrderStatus } = useContext(TryBeerContext);
  const total = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
  const { match: { params: { id } } } = props;

  useEffect(() => {
    axios
      .get('http://localhost:3001/admin/orders')
      .then((res) => {
        setOrderStatus(res.data[0].status);
        setOrderDetails(res.data);
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  }, [setOrderStatus]);

  const updateOrderStatus = (orderId, status) => {
    axios
      .put(`http://localhost:3001/admin/orders/${orderId}`, { status })
      .then(() => {
        setOrderStatus(status);
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  };

  return (
    <div>
      <Header title="Detalhes do Pedido" />
      {orderDetails.length && (
        <div>
          <p data-testid="order-number">{`Pedido ${orderDetails[0].id}`}</p>
          <p data-testid="order-status">{orderStatus}</p>
          <p data-testid="order-total-value">
            {`Total: ${total.format(orderDetails[0].total_price)}`}
          </p>
        </div>
      )}
      {orderStatus !== 'Entregue' && (
        <div>
          <button
            type="button"
            data-testid="mark-as-prepared-btn"
            onClick={ () => { updateOrderStatus(id, 'Preparando'); } }
          >
            Preparar pedido
          </button>
          <button
            type="button"
            data-testid="mark-as-delivered-btn"
            onClick={ () => { updateOrderStatus(id, 'Entregue'); } }
          >
            Marcar como entregue
          </button>
        </div>
      )}
    </div>
  );
}

export default AdminOrderDetails;

AdminOrderDetails.propTypes = {
  match: PropTypes.number.isRequired,
  params: PropTypes.number.isRequired,
};

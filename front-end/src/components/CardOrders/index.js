import React, { useContext } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import './index.css';

function IdPedidoCard(id, index) {
  return (
    <h4 data-testid={ `${index}-order-number` }>
      {`Pedido ${id}`}
    </h4>
  );
}
function AddressCard(deliveryAddress, deliveryNumber, index) {
  return (
    <h5 data-testid={ `${index}-order-address` }>
      { `${deliveryAddress}, ${deliveryNumber}` }
    </h5>
  );
}
function TotalPriceCard(totalPrice, index) {
  return (
    <h5 data-testid={ `${index}-order-total-value` }>
      { `R$ ${totalPrice.toString().replace('.', ',')}` }
    </h5>
  );
}

export default function CardOrder(props) {
  const { setOrderDetails } = useContext(AppContext);
  const { order, index } = props;
  const { id, deliveryAddress, deliveryNumber, totalPrice, status } = order;
  setOrderDetails(order);
  if (!order) return <h1>Loading Card Orders components</h1>;
  return (
    <div className="oCard adminCard">
      <Link to={ `/admin/orders/${id}` }>
        {IdPedidoCard(id, index)}
        {AddressCard(deliveryAddress, deliveryNumber, index)}
        {TotalPriceCard(totalPrice, index)}
        <span data-testid={ `${index}-order-status` }>{ status }</span>
      </Link>
    </div>
  );
}

CardOrder.propTypes = {
  order: propTypes.instanceOf(Object).isRequired,
  index: propTypes.number.isRequired,
};

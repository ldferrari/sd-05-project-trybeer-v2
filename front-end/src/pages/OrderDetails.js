import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import Header from '../components/Header';
import { fetchOrderId } from '../services/ApiTrybeer';
import OrderInformation from '../components/OrderInformation';
import OrderDateAndValue from '../components/OrderDateAndValue';

const userData = JSON.parse(localStorage.getItem('user'));
const email = userData && userData.user && userData.user.email;
const token = userData && userData.token;

const zero = 0;

function fetchAndSetData(data) {
  const { setDate, setTotal, setOrders } = data;

  fetchOrderId(email).then((sales) => {
    if (sales.length > zero) {
      setDate(sales[0].sale_date);
      setTotal(sales[0].total_price);
      setOrders(sales);
    }
  });
}

export default function OrderDetails(props) {
  const { match: { params: { id } } } = props;
  const [orders, setOrders] = useState([]);
  const [date, setDate] = useState('');
  const [total, setTotal] = useState(zero);
  const data = { setDate, setTotal, setOrders };
  useEffect(() => { fetchAndSetData(data); }, [email]);

  if (!token) return <Redirect to="/login" />;
  return (
    <section>
      <Header title="Meus pedidos" />
      <h2 data-testid="order-number">{`Pedido ${id}`}</h2>
      {orders.map((product, index) => (
        <OrderInformation key={ product.id } product={ product } index={ index } />
      ))}
      <OrderDateAndValue total={ total } date={ date } />
    </section>
  );
}

OrderDetails.propTypes = {
  match: PropTypes.number.isRequired,
  params: PropTypes.number.isRequired,
};

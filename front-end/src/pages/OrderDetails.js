import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Header from '../components/Header';
import { fetchOrderId } from '../services/ApiTrybeer';
import OrderInformation from '../components/OrderInformation';
import OrderDateAndValue from '../components/OrderDateAndValue';

export default function OrderDetails(props) {
  const zero = 0;
  const { match: { params: { id } } } = props;
  const [orders, setOrders] = useState([]);
  const [date, setDate] = useState('');
  const [total, setTotal] = useState(zero);
  const products = JSON.parse(localStorage.getItem('cart'));
  const userData = JSON.parse(localStorage.getItem('user'));
  const email = userData && userData.user && userData.user.email;

  useEffect(() => {
    const sales = async () => {
      const result = await fetchOrderId(email);
      setOrders(result);
      setDate(result[0].sale_date);
      setTotal(result[0].total_price);
    };

    return sales();
  }, []);
  return (
    <section>
      <Header title="Meus Pedidos" />
      <h2 data-testid="order-number">{`Pedido ${id}`}</h2>
      {orders && orders.map((order, index) => (
        <OrderInformation key={ order.id } index={ index } products={ products } />
      ))}
      <OrderDateAndValue total={ total } date={ date } />
    </section>
  );
}

OrderDetails.propTypes = {
  match: PropTypes.number.isRequired,
  params: PropTypes.number.isRequired,
};

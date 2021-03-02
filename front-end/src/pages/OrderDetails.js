import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';

import Header from '../components/Header';
import { fetchOrderId } from '../services/ApiTrybeer';
import TryBeerContext from '../context/TryBeerContext';
// import OrderInformation from '../components/OrderInformation';
// import OrderDateAndValue from '../components/OrderDateAndValue';

const decimals = 2;
function reais(products, index) {
  return (products[index].price * products[index].quantity)
    .toFixed(decimals)
    .replace('.', ',');
}

export default function OrderDetails(props) {
  const zero = 0;
  const { match: { params: { id } } } = props;
  const { orderStatus } = useContext(TryBeerContext);
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

    sales();
  }, [email]);

  return (
    <section>
      <Header title="Meus Pedidos" />
      <h2 data-testid="order-number">{`Pedido ${id}`}</h2>
      {orders
        && orders.map((order, index) => (
          <section key={ order.id }>
            <h3 data-testid={ `${index}-product-name` }>
              {products[index] && products[index].name}
            </h3>
            <span>{products[index] && `R$ ${products[index].price}`}</span>
            <span data-testid={ `${index}-product-qtd` }>
              {products[index] && products[index].quantity}
            </span>
            <span data-testid={ `${index}-product-total-value` }>
              {products[index] && `R$ ${reais(products, index)}`}
            </span>
            <span data-testid={ `${index}-order-status` }>{orderStatus}</span>
          </section>
        ))}
      {orders && (
        <section>
          <p data-testid="order-total-value">
            {`${new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(total)}`}
          </p>
          <p data-testid="order-date">
            {`${new Date(date).toLocaleDateString('pt-br', {
              day: '2-digit',
              month: '2-digit',
            })}`}
          </p>
        </section>
      )}
    </section>
  );
}

OrderDetails.propTypes = {
  match: PropTypes.number.isRequired,
  params: PropTypes.number.isRequired,
};

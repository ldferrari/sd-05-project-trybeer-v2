import React, { useEffect, useState } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import ClientMenu from '../../components/client/ClientMenu';
import { getSaleById, getSaleDetails } from '../../services/fetch';
import OrderDetailCard from '../../components/client/OrderDetailCard';

const separateString = (string, separator) => {
  const arrayStrings = string.split(separator);
  return arrayStrings;
};

const getDate = (dateFormat) => {
  if (typeof dateFormat === 'string') {
    const zero = 0;
    const ten = 10;
    let date = dateFormat;
    date = date.substring(zero, ten);
    date = date.split('-');
    // console.log(date);
    return `${date[2]}/${date[1]}`;
  }
  return null;
};

const render = ({ orderInfo, handlePrice, isLogged, productsDetails }) => (
  <div>
    <ClientMenu title="Detalhes de Pedido" data-testid="top-title" />
    <div data-testid="order-number">
      Pedido
      {' '}
      {orderInfo.id}
    </div>
    <div data-testid="order-date">{getDate(orderInfo.sale_date)}</div>
    {productsDetails.map((item, index) => (
      <OrderDetailCard key={ item } item={ item } index={ index } />
    ))}
    <div data-testid="order-total-value">
      Total: R$
      {' '}
      {!orderInfo.total_price ? null : handlePrice(orderInfo.total_price)}
    </div>
    {!isLogged && <Redirect to="/login" />}
  </div>
);

function OrdersDetails({ location: { pathname } }) {
  const [isLogged, setIsLogged] = useState(true);
  const [orderInfo, setOrderInfo] = useState([]);
  const [productsDetails, setProductsDetails] = useState([]);
  useEffect(() => {
    if (localStorage.getItem('user') === null) setIsLogged(false);
  }, []);
  useEffect(() => {
    const array = separateString(pathname, '/');
    getSaleById(array[2]).then((result) => setOrderInfo(result));
    getSaleDetails(array[2]).then((result) => setProductsDetails(result));
  }, [pathname]);
  const handlePrice = (price) => price.replace('.', ',');
  return render({ orderInfo, handlePrice, isLogged, productsDetails });
}

OrdersDetails.propTypes = {
  location: PropTypes.node.isRequired,
};

export default withRouter(OrdersDetails);

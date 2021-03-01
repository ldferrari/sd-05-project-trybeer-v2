import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Menu from '../../components/client/Menu';
import fetchOrderDetails from '../../services/client/fetchOrderDetails';
import ClientDODetail from '../../components/general/ClientDetailsOrderDetail';
import ClientDOMap from '../../components/general/ClientDetailsOrderMap';
import ClientDOPrice from '../../components/general/ClientDetailsOrderPrice';
import '../../css/client/clientDetailsOrderPage.css';

export default function ClientDetailsOrderPage(props) {
  const token = localStorage.getItem('token') || null;
  const [order, setOrder] = useState('');
  useEffect(() => {
    const { id } = props;
    fetchOrderDetails(id).then((data) => setOrder(data));
  }, [props]);
  if (!token) return <Redirect to="/login" />;
  return (
    <div>
      <Menu title="Detalhes de Pedido" />
      <div data-testid="0-order-card-container" className="datailsBody">
        <ClientDODetail order={ order } />
        <ClientDOMap order={ order } />
        <ClientDOPrice order={ order } />
      </div>
    </div>
  );
}

ClientDetailsOrderPage.propTypes = {
  id: PropTypes.string,
};

ClientDetailsOrderPage.defaultProps = {
  id: false,
};

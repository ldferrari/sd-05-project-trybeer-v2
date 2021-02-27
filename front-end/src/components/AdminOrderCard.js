import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { fetchAdminOrders } from '../services/ApiTrybeer';
import AdminOrderLink from './AdminOrderLink';

export default function AdminOrderCard({ token }) {
  const [adminOrders, setAdminOrders] = useState([]);

  useEffect(() => {
    fetchAdminOrders(token).then((sales) => setAdminOrders(sales));
  }, [token]);

  return (
    <section>
      {adminOrders.map((order, index) => (
        <section data-testid={ `${index}-order-card-container` } key={ order.id }>
          <AdminOrderLink order={ order } index={ index } />
        </section>
      ))}
    </section>
  );
}

AdminOrderCard.propTypes = {
  token: PropTypes.string.isRequired,
};

import React, { useEffect, useState } from 'react';

import { fetchAdminOrders } from '../services/ApiTrybeer';
import AdminOrderLink from './AdminOrderLink';

export default function AdminOrderCard() {
  const [adminOrders, setAdminOrders] = useState([]);

  useEffect(() => {
    fetchAdminOrders().then((sales) => setAdminOrders(sales));
  }, []);

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

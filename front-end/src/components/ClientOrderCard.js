import React, { useEffect, useState } from 'react';

import { fetchOrderId } from '../services/ApiTrybeer';
import ClientOrderLink from './ClientOrderLink';

export default function ClientOrderCard() {
  const [clientOrders, setClientOrders] = useState([]);
  const userData = JSON.parse(localStorage.getItem('user'));
  const email = userData && userData.user && userData.user.email;

  useEffect(() => {
    fetchOrderId(email).then((sales) => setClientOrders(sales));
  }, [email]);

  return (
    <section>
      {clientOrders.map((order, index) => (
        <section data-testid={ `${index}-order-card-container` } key={ order.id }>
          <ClientOrderLink order={ order } index={ index } />
        </section>
      ))}
    </section>
  );
}

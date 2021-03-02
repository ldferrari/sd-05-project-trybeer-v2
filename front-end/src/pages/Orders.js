import React from 'react';

import Header from '../components/Header';
import ClientOrderCard from '../components/ClientOrderCard';

export default function Orders() {
  return (
    <section>
      <Header title="Meus Pedidos" />
      <ClientOrderCard />
    </section>
  );
}

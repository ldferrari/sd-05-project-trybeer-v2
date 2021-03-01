import React from 'react';
import { Redirect } from 'react-router-dom';

import Header from '../components/Header';
import AdminOrderCard from '../components/AdminOrderCard';

export default function AdminOrders() {
  const userData = JSON.parse(localStorage.getItem('user'));
  const token = userData && userData.token;

  if (!token) return <Redirect to="/login" />;
  return (
    <section>
      <Header title="Pedidos Pendentes" />
      <AdminOrderCard token={ token } />
    </section>
  );
}

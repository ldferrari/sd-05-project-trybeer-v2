import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Menu from '../../components/client/Menu';
import { ClientContext } from '../../context/client/ClientProvider';
import ClientCheckoutPageMaster from '../../components/general/ClientCheckoutPageMaster';
import '../../css/client/clientCheckoutPage.css';

export default function ClientCheckoutPage() {
  const token = localStorage.getItem('token') || null;
  const { redirect } = useContext(ClientContext);
  if (!token) return <Redirect to="/login" />;
  if (redirect) return <Redirect to="/products" />;
  return (
    <div className="checkoutBody">
      <Menu title="Finalizar Pedido" />
      <ClientCheckoutPageMaster />
    </div>
  );
}

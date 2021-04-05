import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Menu from '../../components/client/Menu';
import MeusPedidosCard from '../../components/client/MeusPedidosCard';
import MeusPedidosData from '../../services/client/fetchMeusPedidosData';
import '../../css/client/clientMeusPedidosPage.css';

export default function ClientMeusPedidos() {
  const token = localStorage.getItem('token') || null;
  const [pedidos, setPedidos] = useState([]);
  useEffect(() => {
    if (!JSON.parse(localStorage.getItem('user'))) {
      setPedidos('');
    } else {
      MeusPedidosData(JSON.parse(localStorage.getItem('user')).id)
        .then((response) => setPedidos(response));
    }
  }, []);
  if (!token) return <Redirect to="/login" />;
  return (
    <div>
      <Menu title="Meus Pedidos" />
      <MeusPedidosCard pedidos={ pedidos } />
    </div>
  );
}

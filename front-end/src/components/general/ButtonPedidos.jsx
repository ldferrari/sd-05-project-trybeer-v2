import React from 'react';
import { Link } from 'react-router-dom';

export default function ButtonPedidos() {
  return (
    <Link
      to="/admin/orders"
      data-testid="side-menu-item-orders"
      className="buttonLateralAdm"
    >
      Pedidos
    </Link>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';

export default function ButtonPedidos() {
  return (
    <div className="buttonLateralAdm">
      <Link
        to="/admin/orders"
        data-testid="side-menu-item-orders"
        // className="buttonLateralAdm"
      >
        Pedidos
      </Link>
    </div>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';

export default function LinkOrders() {
  return (
    <Link
      to="/orders"
      data-testid="side-menu-item-my-orders"
      className="buttonLateral"
    >
      Meus Pedidos
    </Link>
  );
}

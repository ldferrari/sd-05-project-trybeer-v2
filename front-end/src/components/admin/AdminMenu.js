import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/ClientMenu.css';

function sair() {
  return (
    <Link
      className="btn-side"
      data-testid="side-menu-item-logout"
      to="/login"
      onClick={ () => localStorage.clear() }
    >
      Sair
    </Link>
  );
}

function AdminMenu() {
  return (
    <div
      className="admin-side-bar-container"
      data-testid="top-hamburguer"
    >
      <h2>TryBeer</h2>
      <nav>
        <Link
          className="btn-side"
          to="/admin/orders"
          data-testid="side-menu-item-orders"
        >
          Pedidos
        </Link>
        <Link className="btn-side" to="/admin/profile">Perfil</Link>
        <Link className="btn-side" data-testid="side-menu-item-chat" to="/admin/chats">
          Conversas
        </Link>
        {sair()}
      </nav>
    </div>
  );
}

export default AdminMenu;

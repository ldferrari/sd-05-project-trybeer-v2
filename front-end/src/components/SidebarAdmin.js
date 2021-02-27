import React from 'react';
import { Link } from 'react-router-dom';

export default function SidebarAdmin() {
  return (
    <section className="admin-side-bar-container">
      <section>
        <Link to="/admin/orders" data-testid="side-menu-item-orders">Pedidos</Link>
        <Link to="/admin/profile" data-testid="side-menu-item-profile">Perfil</Link>
        <Link to="/admin/chats" data-testid="side-menu-item-chat">Conversas</Link>
      </section>
      <Link
        to="/login"
        data-testid="side-menu-item-logout"
        onClick={ () => localStorage.clear() }
      >
        Sair
      </Link>
    </section>
  );
}

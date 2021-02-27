import React from 'react';
import { Link } from 'react-router-dom';

export default function SidebarClient() {
  return (
    <section className="side-menu-container">
      <section>
        <Link to="/products" data-testid="side-menu-item-products">Meus produtos</Link>
        <Link to="/orders" data-testid="side-menu-item-my-orders">Meus pedidos</Link>
        <Link to="/profile" data-testid="side-menu-item-my-profile">Meu perfil</Link>
        <Link to="/chat" data-testid="side-menu-chat">Conversar com a loja</Link>
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

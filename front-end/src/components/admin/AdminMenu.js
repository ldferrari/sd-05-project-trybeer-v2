import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/ClientMenu.css';

const b = 'btn-side';
const d1 = 'side-menu-item-orders';
const d2 = 'side-menu-item-profile';
const d3 = 'side-menu-item-logout';
const to1 = '/admin/orders';
const to2 = '/admin/profile';
const to3 = '/login';

const renderLinks = () => (
  <nav>
    <Link className={ b } data-testid={ d1 } to={ to1 }>Pedidos</Link>
    <Link className={ b } data-testid={ d2 } to={ to2 }>Perfil</Link>
    <Link
      className={ b }
      data-testid={ d3 }
      to={ to3 }
      onClick={ () => localStorage.clear() }
    >
      Sair
    </Link>
  </nav>
);

function AdminMenu() {
  return (
    <div className="admin-side-bar-container">
      <h2>TryBeer</h2>
      {renderLinks()}
    </div>
  );
}

export default AdminMenu;

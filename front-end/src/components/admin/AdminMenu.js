import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../css/ClientMenu.css';

function hamburger(openClose) {
  return (
    <label className="top-hamburguer" data-testid="top-hamburguer" htmlFor="check">
      &#9776;
      <input type="checkbox" id="check" className="l" onChange={ () => openClose() } />
    </label>
  );
}

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

function nav() {
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

function AdminMenu() {
  const [click, setClick] = useState(false);
  function openClose() {
    if (document.getElementById('check').checked) {
      setClick(true);
    } else {
      setClick(false);
    }
  }
  const left = click ? '0' : '-40%';
  const display = click ? 'block' : 'none';
  return (
    <header className="menu-superior">
      {hamburger(openClose)}
      <div className="menu-container" style={ { left, display } }>{nav()}</div>
    </header>
  );
}

export default AdminMenu;

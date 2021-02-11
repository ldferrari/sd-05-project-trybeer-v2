import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../../css/ClientMenu.css';

function hamburger(openClose) {
  return (
    <label className="top-hamburguer" data-testid="top-hamburguer" htmlFor="check">
      &#9776;
      <input type="checkbox" id="check" onChange={ () => openClose() } />
    </label>
  );
}

function menuTitle(title) {
  return (
    <h1 className="top-title" data-testid="top-title">
      {title}
    </h1>
  );
}

function nav() {
  return (
    <nav className="side-menu">
      <Link className="btn-side btn-menu" to="/products">
        Produtos
      </Link>
      <Link className="btn-side btn-menu" to="/orders">
        Meus Pedidos
      </Link>
      <Link className="btn-side btn-menu" to="/profile">
        Meu Perfil
      </Link>
      <Link className="btn-side btn-menu" to="/login">Sair</Link>
      <Link className="btn-side btn-menu" data-testid="side-menu-chat" to="/chat">
        Conversar com a loja
      </Link>
    </nav>
  );
}

function ClientMenu(props) {
  const [click, setClick] = useState(false);
  const { title } = props;
  function openClose() {
    if (document.getElementById('check').checked) {
      setClick(true);
    } else {
      setClick(false);
    }
  }
  const l = click ? '0' : '-40%';
  const d = click ? 'block' : 'none';
  return (
    <header className="menu-superior">
      {hamburger(openClose)}
      {menuTitle(title)}
      <div className="menu-container" style={ { l, d } }>{nav()}</div>
    </header>
  );
}

export default ClientMenu;

ClientMenu.propTypes = {
  title: PropTypes.string.isRequired,
};

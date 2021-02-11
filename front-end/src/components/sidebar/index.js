import React from 'react';
import { Link } from 'react-router-dom';

function ProductsLi() {
  return (
    <li className="menuBtn">
      <Link className="menuBtn" to="/products" data-testid="side-menu-item-products">
        Produtos
      </Link>
    </li>
  );
}
function OrdersLi() {
  return (
    <li className="menuBtn">
      <Link to="/orders" className="menuBtn" data-testid="side-menu-item-my-orders">
        Meus pedidos
      </Link>
    </li>
  );
}
function ProfileLi() {
  return (
    <li className="menuBtn">
      <Link to="/profile" className="menuBtn" data-testid="side-menu-item-my-profile">
        Meu Perfil
      </Link>
    </li>
  );
}
function ChatLi() {
  return (
    <li className="menuBtn">
      <Link to="/chat" className="menuBtn" data-testid="side-menu-chat">
        Conversar com a loja
      </Link>
    </li>
  );
}
function LogoutLi() {
  return (
    <li className="menuBtn">
      <Link
        to="/"
        className="menuBtn"
        data-testid="side-menu-item-logout"
        onClick={ () => {
          localStorage.removeItem('token');
          localStorage.removeItem('cart');
        } }
      >
        Sair
      </Link>
    </li>
  );
}

const SideBar = () => (
  <aside className="sideBar side-menu-container">
    <ul>
      {ProductsLi()}
      {OrdersLi()}
      {ProfileLi()}
      {ChatLi()}
    </ul>
    <ul>{LogoutLi()}</ul>
  </aside>
);

export default SideBar;

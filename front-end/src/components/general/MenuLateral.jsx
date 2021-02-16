import React from 'react';
import LinkProducts from './menuLateral/LinkProducts';
import LinkOrders from './menuLateral/LinkOrders';
import LinkProfile from './menuLateral/LinkProfile';
import LinkLogin from './menuLateral/LinkLogin';
import LinkChat from './menuLateral/LinkChat';

export default function MenuLateral() {
  return (
    <div className="side-menu-container">
      <nav className="menuLateral">
        <div className="menuButton">
          <LinkProducts />
          <LinkOrders />
          <LinkProfile />
          <LinkChat />
        </div>
        <div className="menuButton textCenter">
          <LinkLogin />
        </div>
      </nav>
    </div>
  );
}

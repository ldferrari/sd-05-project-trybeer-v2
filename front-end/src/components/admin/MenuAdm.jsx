import React from 'react';
import '../../css/admin/menuAdm.css';
import ButtonPedidos from '../general/ButtonPedidos';
import ButtonPerfil from '../general/ButtonPerfil';
import ButtonLogin from '../general/ButtonLogin';
import ButtonChat from '../general/ButtonChat';

export default function MenuAdm() {
  return (
    <div className="side-menu-container-adm">
      <h1 className="topTitleAdm">TryBeer</h1>
      <nav className="menuLateralAdm">
        <div className="menuButtonAdm">
          <ButtonPedidos />
          <ButtonPerfil />
          <ButtonChat />
        </div>
        <div className="menuButtonAdm textCenter">
          <ButtonLogin />
        </div>
      </nav>
    </div>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';

export default function ButtonPerfil() {
  return (
    <div>
      <Link
        to="/admin/profile"
        data-testid="side-menu-item-profile"
        className="buttonLateralAdm"
      >
        Perfil
      </Link>
    </div>
  );
}

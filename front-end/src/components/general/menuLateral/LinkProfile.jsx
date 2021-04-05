import React from 'react';
import { Link } from 'react-router-dom';

export default function LinkProfile() {
  return (
    <Link
      to="/profile"
      data-testid="side-menu-item-my-profile"
      className="buttonLateral"
    >
      Meu Perfil
    </Link>
  );
}

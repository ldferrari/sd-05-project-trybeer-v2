import React from 'react';
import { Link } from 'react-router-dom';

export default function LinkProducts() {
  return (
    <div>
      <Link
        to="/products"
        data-testid="side-menu-item-products"
        className="buttonLateral"
      >
        Produtos
      </Link>
    </div>
  );
}

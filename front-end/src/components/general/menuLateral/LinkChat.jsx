import React from 'react';
import { Link } from 'react-router-dom';

export default function LinkChat() {
  return (
    <div>
      <Link
        to="/chat"
        data-testid="side-menu-chat"
        className="buttonLateral"
      >
        Conversar com a loja
      </Link>
    </div>
  );
}

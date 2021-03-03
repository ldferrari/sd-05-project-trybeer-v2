import React from 'react';
import { Link } from 'react-router-dom';

export default function ButtonChat() {
  return (
    <Link
      to="/admin/chats"
      data-testid="side-menu-item-chat"
      className="buttonLateralAdm"
    >
      Conversas
    </Link>
  );
}

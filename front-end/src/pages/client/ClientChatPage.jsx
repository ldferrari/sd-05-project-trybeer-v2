import React from 'react';
import { Redirect } from 'react-router-dom';
import Menu from '../../components/client/Menu';

export default function ClientChatPage() {
  const token = localStorage.getItem('token') || null;
  if (!token) return <Redirect to="/login" />;

  return (
    <div>
      <Menu title="Chat" />
      AQUI VAI O CHAT
    </div>
  );
}

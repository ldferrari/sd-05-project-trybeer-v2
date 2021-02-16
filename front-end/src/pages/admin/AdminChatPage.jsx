import React from 'react';
import { Redirect } from 'react-router-dom';
import MenuAdm from '../../components/admin/MenuAdm';

export default function AdminChatPage() {
  const token = localStorage.getItem('token') || null;
  if (!token) return <Redirect to="/login" />;

  return (
    <div>
      <MenuAdm />
      AQUI VAI O CHAT
    </div>
  );
}

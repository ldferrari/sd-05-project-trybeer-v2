import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Header from '../components/Header';
import { getRecentMessages } from '../services/ApiTrybeer';

function AdminChatList() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getRecentMessages().then((recent) => setMessages(recent));
  }, []);

  return (
    <div>
      <Header title="TryBeer" />
      {messages.length === 0 && (
        <section data-testid="text-for-no-conversation">
          Nenhuma conversa por aqui
        </section>
      )}
      {messages
        && messages.map(({ _id, lastMessage }, index) => (
          <section key={ index }>
            <Link to="/admin/chat" data-testid="containerChat">
              <section data-testid="profile-name">{_id}</section>
              <section data-testid="last-message">{lastMessage}</section>
            </Link>
          </section>
        ))}
    </div>
  );
}

export default AdminChatList;

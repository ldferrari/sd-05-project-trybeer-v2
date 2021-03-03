import React, { useEffect, useState } from 'react';
import { getAdmMessages } from '../services/api';
import Header from '../components/Header';

const AdmChats = () => {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    getAdmMessages().then((message) => setMessages(message));
  }, []);
  return (
    <div>
      <Header />
      <div data-testid="containerChat" style={ { border: '1px solid black' } }>
        {messages.length > 0 ? (
          messages.map((mensagens) => (
            <ul key={ mensagens._id }>
              <li data-testid="profile-name">{`${mensagens._id}`}</li>
              <span data-testid="last-message">{`${mensagens.ultimaMensagem}`}</span>
            </ul>
          ))
        ) : (
          <p data-testid="message-">Nenhuma conversa por aqui</p>
        )}
      </div>
    </div>
  );
};
export default AdmChats;

// Componente filho da page ChatRoom: quando admin seleciona uma conversa com um cliente

import React from 'react';
const io = require("socket.io-client");
import { Link } from 'react-router-dom';
const { getMessagesByClient } = require('../../services/fetchMongo');
require('dotenv').config();

function AdminChat(props) {
  const { email } = props;
  // prop email vindo do ChatRoom que permite identificar a conversa especifica
  const PORT = process.env.PORT || 3001;
  const sellerSocket = io(`http://localhost:${PORT}/admin/chats`);

  useEffect(async () => {
    const messagesByClient = await getMessagesByClient(email);
    return messagesByClient;
  }, []);

  const handleSend = () => {};
  // sellerSocketIo.emit('message', somedata);
  // aqui, todo em espelho comparado com o page/client/ClientChat
  

  return (
    <section>
      {/* 1. Parte manipulada real-time com socket */}
      {/* <div>
        {msgsByClient &&
          msgsByClient.forEach((msg) => (
            <div>
              <p>
                <span data-testid="nickname">{msg.nickname}</span> -
                <span data-testid="message-time">{msg.hour}</span>
              </p>
              <div data-testid="text-message">{msg.message}</div>
            </div>
          ))}
      </div> */}
      {/* 2. Parte passando por bd: */}
      <div>
        {allMessagesByClient &&
          allMessagesByClient.forEach((msg) => (
            <div>
              <p>
                <span data-testid="nickname">{msg.nickname}</span> -
                <span data-testid="message-time">{msg.hour}</span>
              </p>
              <div data-testid="text-message">{msg.message}</div>
            </div>
          ))}
      </div>
      <input
        data-testid="chat-message"
        type="text"
        id="chat-input"
        placeholder="Digite sua mensagem"
      />
      <button data-testid="send-message-btn" type="button" id="send" onClick={handleSend}>
        Enviar
      </button>
      <Link to="/admin/chats">
        <button data-testid="back-button" type="button">
          Voltar
        </button>
      </Link>
    </section>
  );
}

export default AdminChat;

import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import moment from 'moment';
import { getMessages } from '../services/api';
import Header from '../components/Header';

const socketClient = io('http://localhost:3001');
socketClient.on('connect', () => console.log('Servidor conectado'));
const formatDate = 'HH:mm';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [writingMessage, setWritingMessage] = useState('');
  const email = localStorage.getItem('email');

  const handleChange = (message) => {
    setWritingMessage(message.value);
  };
  const handleClick = () => {
    // createdMessage(writingMessage, email)
    const time = moment(Date.now()).format(formatDate);
    socketClient.emit('message', {
      nickname: email,
      chatMessage: writingMessage,
    });
    setMessages([
      ...messages,
      { nickname: email, chatMessage: writingMessage, time },
    ]);
  };
  useEffect(() => {
    getMessages().then((message) => setMessages(message));
  }, []);

  useEffect(() => {}, [messages]);

  return (
    <div>
      <Header />
      <div style={ { border: '1px solid black' } }>
        {messages.length > 0 ? (
          messages.map((mensagens) => (
            <ul key={ mensagens.nickname }>
              <li data-testid="nickname">{`${mensagens.nickname}`}</li>
              <span data-testid="message-time">{`${mensagens.time}`}</span>
              <span data-testid="text-message">{mensagens.chatMessage}</span>
            </ul>
          ))
        ) : (
          <p data-testid="message-">Não há mensagens</p>
        )}
      </div>
      <input
        data-testid="message-input"
        onChange={ (event) => handleChange(event.target) }
        type="text"
      />
      <button onClick={ handleClick } data-testid="send-message" type="button">
        Send
      </button>
    </div>
  );
};
export default Chat;

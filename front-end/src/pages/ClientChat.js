import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

import Header from '../components/Header';

const socket = io('http://localhost:3001');

function ClientChat() {
  const [chatHistory, setChatHistory] = useState([]);
  const [nickname, setNickname] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    const email = userData && userData.user && userData.user.email;

    socket.on('chatHistory', (payload) => {
      setChatHistory(payload);
    });

    return setNickname(email);
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    socket.emit('sendMessage', { message, nickname });

    socket.on('saveMessage', (payload) => {
      setChatHistory([...chatHistory, payload]);
    });

    event.target.reset();
  };

  return (
    <section>
      <Header title="TryBeer" />
      <section>
        {chatHistory
          && chatHistory.map((msg) => (
            <section key={ msg.date }>
              <p data-testid="nickname">{ msg.nickname }</p>
              <p data-testid="message-time">{ msg.date }</p>
              <p data-testid="text-message">{ msg.chatMessage }</p>
            </section>
          ))}
      </section>
      <form onSubmit={ (event) => sendMessage(event) }>
        <input
          type="text"
          data-testid="message-input"
          onChange={ (event) => setMessage(event.target.value) }
        />
        <button type="submit" data-testid="send-message">
          Enviar
        </button>
      </form>
    </section>
  );
}

export default ClientChat;

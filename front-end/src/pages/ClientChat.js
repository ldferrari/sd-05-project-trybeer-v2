import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

import { getChatHistory } from '../services/ApiTrybeer';
import Header from '../components/Header';

const socketClient = io('http://localhost:3001');

socketClient.on('connect', () => console.log('Server online.'));

export default function ClientChat() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const userData = JSON.parse(localStorage.getItem('user'));
  const email = userData && userData.user && userData.user.email;
  const role = userData && userData.user && userData.user.role;

  useEffect(() => {
    getChatHistory().then((history) => setChatHistory(history));
  }, []);

  // https://stackoverflow.com/questions/9418697/how-to-unsubscribe-from-a-socket-io-subscription#9696077
  useEffect(() => {
    const sendMessage = (newMessage) => setChatHistory([...chatHistory, newMessage]);
    socketClient.on('message', sendMessage);
    return () => socketClient.off('message', sendMessage);
  }, [chatHistory]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (message.trim()) {
      socketClient.emit('message', { nickname: email, message, role });
      setMessage('');
    }
  };

  return (
    <main>
      <Header title="Chat" />
      <ul>
        {chatHistory.map((msg, index) => (
          <li key={ index } data-testid="text-message">
            <span data-testid="nickname">{ msg.nickname }</span>
            <span data-testid="message-time">{ ` @${msg.timestamp}` }</span>
            <br />
            <span data-testid="text-message">{ msg.message }</span>
          </li>
        ))}
      </ul>
      <form>
        <input
          data-testid="message-input"
          type="text"
          value={ message }
          onChange={ (event) => setMessage(event.target.value) }
        />
        <button
          data-testid="send-message"
          type="submit"
          onClick={ (event) => handleSubmit(event) }
        >
          Enviar
        </button>
      </form>
    </main>
  );
}

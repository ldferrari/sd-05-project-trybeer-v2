import React, { useState, useEffect } from 'react';

const io = require('socket.io-client');
const { getMessagesByClient } = require('../../services/fetchMongo');

require('dotenv').config();

const tresMilUm = 3001;

const PORT = process.env.PORT || tresMilUm;
const buyerSocket = io(`http://localhost:${PORT}`);
// https://socket.io/docs/v3/client-initialization/

const renderMessages = (list) => (
  <div>
    { list
      && list.map((msg, index) => (
        <div key={ index }>
          <p>
            <span data-testid="nickname">{msg.email}</span>
            -
            <span data-testid="message-time">{msg.hour}</span>
          </p>
          <div data-testid="text-message">{msg.message}</div>
        </div>
      ))}
  </div>
);

function ClientChat() {
  const user = JSON.parse(localStorage.getItem('user'));
  const { email } = user;

  const [buyerMessage, setBuyerMessage] = useState('');
  const [msgsByClient, setMsgsByClient] = useState('');

  useEffect(() => {
    async function fetchData() {
      const messagesByClient = await getMessagesByClient(email);
      setMsgsByClient(messagesByClient);
    }
    fetchData();
  }, [email]);
  useEffect(() => {
    buyerSocket.on('showMessage', ({ hour, message }) => {
      const divMessage = { email, hour, message };
      setMsgsByClient((previousState) => [...previousState, divMessage]);
    });
  }, []);

  // talvez [email]

  const handleTextChange = (e) => {
    const message = e.target.value;
    setBuyerMessage(message);
  };

  const handleSend = async () => {
    // const messagesByClient = await getMessagesByClient(email);
    buyerSocket.emit('message', { email, message: buyerMessage });
    // return messagesByClient;
  };

  // let msgsByClient = [];

  return (
    <section>
      {/* 1. Parte manipulada real-time com socket */}
      {renderMessages(msgsByClient)}
      {/* 2. Parte passando por bd: */}
      {/* <div>
        {messagesByClient &&
          messagesByClient.forEach((msg) => (
            <div>
              <p>
                <span data-testid="nickname">{msg.nickname}</span> -
                <span data-testid="message-time">{msg.hour}</span>
              </p>
              <div data-testid="text-message">{msg.message}</div>
            </div>
          ))}
      </div> */}
      <input
        data-testid="message-input"
        type="text"
        id="message-input"
        placeholder="Digite sua mensagem"
        onChange={ (e) => handleTextChange(e) }
      />
      <button
        data-testid="send-message"
        type="button"
        id="send"
        onClick={ () => handleSend() }
      >
        Enviar
      </button>
    </section>
  );
}

export default ClientChat;

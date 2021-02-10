import React, { useState } from 'react';
const io = require("socket.io-client");
// const { createMessage, getMessages } = require('./modelsMongoDb.messagesModel');

function ClientChat() {

  const buyerSocket = io('http://localhost:3000/chat');
  // https://socket.io/docs/v3/client-initialization/

  const user = JSON.parse(localStorage.getItem('user'));
  const { email } = user;

  const [buyerMessage, setBuyerMessage] = useState('');

  const handleTextChange = (e) => {
    const message = e.target.value;
    setBuyerMessage(message);
  }

  const handleSend = () => {
    // const buyerMessage = document.getElementById('message-input').value;
    // no need for DOM now girl! you are on React
    buyerSocket.emit('message', { email, buyerMessage });
  };

  buyerSocket.on('showMessage', ({ nickname, hour, message }) => {
    // how to show them? manipulating DOM but now it is a complete complex div
  });

  return (
    <section>
      {/* Parte manipulada real-time com socket
      <p>
        <span data-testid="nickname" /> - <span data-testid="message-time" />
      </p>
      <div data-testid="text-message"></div> */}
      {/* Parte passando por bd que precisa de refresh? */}
      <div>
        {allMessages &&
          allMessages.forEach((msg) => (
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
        data-testid="message-input"
        type="text"
        id="message-input"
        placeholder="Digite sua mensagem"
        onChange={(e) => handleTextChange(e)}
      />
      <button data-testid="send-message" type="button" id="send" onClick={handleSend}>
        Enviar
      </button>
    </section>
  );
}

export default ClientChat;
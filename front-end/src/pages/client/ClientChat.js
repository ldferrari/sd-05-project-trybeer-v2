import React, { useState } from 'react';
const io = require('socket.io-client');
const { getMessagesByClient } = require('../../services/fetchMongo');
require('dotenv').config();

function ClientChat() {
  const PORT = process.env.PORT || 3001;
  const buyerSocket = io(`http://localhost:${PORT}`);
  // https://socket.io/docs/v3/client-initialization/

  const user = JSON.parse(localStorage.getItem('user'));
  const { email } = user;

  const [buyerMessage, setBuyerMessage] = useState('');
  const [msgsByClient, setMsgsByClient] = useState([]);

  // useEffect(async () => {
  //   const messagesByClient = await getMessagesByClient(email);
  //   return messagesByClient;
  // }, []);
  // talvez [email]

  const handleTextChange = (e) => {
    const message = e.target.value;
    setBuyerMessage(message);
  };

  const handleSend = async () => {
    buyerSocket.emit('message', { email, buyerMessage });
  };

  buyerSocket.on('showMessage', async ({ email, hour, buyerMessage }) => {
    const divMessage = { email, hour, buyerMessage };
    console.log(divMessage);
    // setMsgsByClient((previousState) => [...previousState, divMessage]);
    // OU
    setMsgsByClient(msgsByClient.push(divMessage));
    console.log(msgsByClient);
    // BD has to be fetched here
    const messagesByClient = await getMessagesByClient(email);
    // // return messagesByClient;
    setMsgsByClient(messagesByClient);
  });

  return (
    <section>
      {/* 1. Parte manipulada real-time com socket */}
      <div>
        {msgsByClient &&
          msgsByClient.forEach((msg) => (
            <div>
              <p>
                <span data-testid="nickname">{msg.email}</span> -
                <span data-testid="message-time">{msg.hour}</span>
              </p>
              <div data-testid="text-message">{msg.buyerMessage}</div>
            </div>
          ))}
      </div>
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
        onChange={(e) => handleTextChange(e)}
      />
      <button data-testid="send-message" type="button" id="send" onClick={() => handleSend()}>
        Enviar
      </button>
    </section>
  );
}

export default ClientChat;

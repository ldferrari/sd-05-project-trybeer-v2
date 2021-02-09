// Componente filho da page ChatRoom: quando admin seleciona uma conversa com um cliente

import React from 'react';
// const { createMessage, getMessages } = require('./modelsMongoDb.messagesModel');
// getMessagesByClient? to have allMessagesByClient data

// import something to be able to make socket io work?
// window.onload = () => {
//   const adminSocketIo = window.io();

function AdminChat() {
  // props que permitem identificar a conversa especifica
  // por exemplo por email ou id do cliente

  const handleSend = () => {};
  //   adminSocketIo.emit('something', somedata);

  return (
    <section>

      {/* Parte manipulada real-time com socket
      <p>
        <span data-testid="nickname" /> - <span data-testid="message-time" />
      </p>
      <div data-testid="chat-message"></div> */}
      {/* Parte passando por bd que precisa de refresh? */}
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
      <button data-testid="back-button" type="button" onClick={handleBack}>
        {/* redirect to admin/chat */}
        Voltar
      </button>
    </section>
  );
}

export default AdminChat;

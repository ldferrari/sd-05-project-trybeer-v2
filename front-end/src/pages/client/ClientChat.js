import React from 'react';
// const { createMessage, getMessages } = require('./modelsMongoDb.messagesModel');

// import something to be able to make socket io work?
// window.onload = () => {
//   const clientSocketIo = window.io();

function ClientChat() {

  const handleSend = () => {};

  //   // See if nickname is default or chosen by user depending on Save button
  //   let nickname = 'randomName';
  //   const chosenNickname = document.getElementById('nickname-input');
  //   const nicknameBtn = document.getElementById('nickname-save');
  //   nicknameBtn.addEventListener('click', () => {
  //     nickname = chosenNickname.value;
  //     clientSocketIo.emit('userChangedNickname', nickname);
  //   });

  //   // [Req2] 1. User click send message
  //   const sendBtn = document.getElementById('send');
  //   sendBtn.addEventListener('click', () => {
  //     const chatMessage = document.getElementById('message-input').value;
  //     clientSocketIo.emit('message', { chatMessage, nickname });
  //   });

  //   // [Req2] 3. Show the formatted message on the chat div
  //   clientSocketIo.on('message', (fullMessage) => {
  //     const divMessages = document.getElementById('messages');
  //     const li = document.createElement('li');
  //     li.setAttribute('data-testid', 'message');
  //     li.textContent = fullMessage;
  //     divMessages.append(li);
  //   });

  //   // [Req4] Adapt dom everytime users change something
  //   // being able to check if user is current user
  //   let currentId = '';
  //   clientSocketIo.on('seeUserId', (id) => {
  //     currentId = id;
  //   });
  // };

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
      />
      <button data-testid="send-message" type="button" id="send" onClick={handleSend}>
        Enviar
      </button>
    </section>
  );
}

export default ClientChat;

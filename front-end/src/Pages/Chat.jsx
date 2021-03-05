import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Restrict from '../Components/Restrict';
import HeaderAdmin from '../Components/AdminSideBar';
import HeaderClient from '../Components/Header'
import ChatMessage from '../Components/ChatMessage';
import helper from '../Helper';


import Input from '../Components/Input';

const containerStyle = {
  justifyContent: 'space-between',
  minHeight: '90vh',
};

const Chat = ({
  history,
  match: {
    params: { id = null },
  },
  socket,
}) => {
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState([]);
  const role = helper.getUserData().role;
  const myId = helper.getUserData().id;

  const updateChat = (messages) => {
    setChat(
      id ? messages.filter(({ from: { id: sid }, to }) => (
        (String(sid) === String(id)) || (String(to.id) === String(id))
      ))
        : messages,
    );
  };
  console.log("chat", chat);
  
  useEffect(() => {
    let messages = helper.getChatMessages();
    updateChat(messages);
    const x = helper.getUserData().role === 'Client' ? helper.getUserData().id : 'loja';
    
    socket.on(x, (newMessage) => {
      messages = helper.getChatMessages();
      updateChat([...messages, newMessage]);
      helper.updateChat(newMessage);
    });
    return () => {
      socket.off(x);
    };
  }, []);

  const messageHandle = () => ({ target: { value } }) => {
    setMessage(value);
  };

  const isSelfMessage = (msg) => {
    console.log(msg, myId);
    return myId === msg.from
  };

  return (
    <Restrict>
      {role === 'administrator' ? <HeaderAdmin pathname={ history.location.pathname } /> : <HeaderClient pathname={ history.location.pathname } /> }
      <div className="container-main">
      <button type='button'data-testid="back-button" onClick={() => history.push('/admin/chats')}>Back</button>
        <div className="container-screen" style={ containerStyle }>
          <div style={ { display: 'flex', width: '100%', flexDirection: 'column' } }>
            { chat.length !== 0 ? chat.map((chatBuffer) => (
              <ChatMessage
                key={ chatBuffer.createdAt }
                buffer={ chatBuffer }
                isSelf={ isSelfMessage(chatBuffer) }
              />
            )) : <p>Não há mensagens.</p>}
          </div>
          <div
            style={ { display: 'flex', width: '100%', justifyContent: 'space-between' } }
          >
            <Input
              name="message"
              placeholder="Insira sua mensagem aqui"
              test="message-input"
              onChange={ messageHandle() }
            />
          </div>
          <button
            className="btn"
            data-testid="send-message"
            disabled={ !message.length }
            type="button"
            onClick={ () => {
              socket.emit('message', { fromId: myId, toId: id, message });
              document.getElementById('input_message').value = '';
              setMessage('');
            } }
            style={ { marginLeft: '8px' } }
          >
            <i className="material-icons">send</i>
          </button>
        </div>
      </div>
    </Restrict>
  );
};

Chat.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  socket: PropTypes.shape({
    emit: PropTypes.func,
    id: PropTypes.string,
    off: PropTypes.func,
    on: PropTypes.func,
  }).isRequired,
};

export default helper.Socket(Chat);

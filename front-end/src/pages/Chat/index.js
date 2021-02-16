import React, { useEffect, useState } from 'react'; // useContext
import propTypes from 'prop-types';
import { getMessagesById } from '../../services/requestAPI';
import { verifyToken } from '../../services/webTokenMiddleware';
// import AppContext from '../../context/AppContext';
import Header from '../../components/header';
import Footer from '../../components/footer';
import useChat from '../../components/useChat';

import './index.css';

const Chat = (props) => {
  // const { email } = useContext(AppContext);
  const token = localStorage.getItem('token');
  const payload = verifyToken(token);
  const { email, id } = payload;
  // console.log('payload=====>', payload);
  // console.log('email===>', email);
  // const { Id } = props; // pega id do link/requisição/jwt
  const { messages, sendMessage, setHistory } = useChat(email); 
  // Creates a websocket and manages messaging;
  const [newMessage, setNewMessage] = useState(''); // Message to be sent
  // =>const [theOrders, setOrders] = useState([]);

  useEffect(() => {
    const { history } = props;
    if (!localStorage.getItem('token')) {
      history.push('/login');
    }
    async function fetchOldMessages() {
      const { data } = await getMessagesById(localStorage.getItem('token'), id);
      // console.log(data);
      if (data.code) return false;
      setHistory(data.map(({ time, nome, message }) => ({ time, nome, message })));
      setNewMessage(data);
      return true;
    }
    fetchOldMessages();
  }, [props, id]);

  const handleNewMessageChange = (event) => {
    const dateFormat = require('dateformat');
    const now = new Date();
    // não precisa const date = dateFormat(now, 'dd-mm-yyyy');
    const time = dateFormat(now, 'HH:MM');
    // console.log(now,time);
    setNewMessage({ message: event.target.value, time, nome: email });
    // precisa colocar a const time e o email além da msg ou faz isso pelo "server?"
  };

  const handleSendMessage = () => {
    // console.log('MANDNOD MENSAGEM');
    sendMessage(newMessage);
    // setNewMessage('');
    newMessage.message = '';
  };
  return (
    <div className="">
      <Header>CHAT</Header>
      <h3 className="title">{email}</h3>
      <div className="messages-container">
        <ul className="messages-list">
          {messages.map((message) => (
            <li
              key={ `${message.time}-${message.message}` }
              className={ `message-item ${
                message.nome === email ? 'my-message' : 'received-message' // CSS!
              }` }
            >
              <p data-testid="nickname" className="message-name">{message.nome}</p>
              <p data-testid="message-time" className="message-time">{message.time}</p>
              <h4 data-testid="text-message" className="message-body">{message.message}</h4>
            </li>
          ))}
        </ul>
      </div>
      <input
        type="text"
        data-testid="message-input"
        value={ newMessage.message }
        onChange={ handleNewMessageChange }
        placeholder="Digite..."
        className="new-message-input-field"
      />
      <button
        type="button"
        onClick={ handleSendMessage }
        className="send-message-button"
        data-testid="send-message"
      >
        ENVIAR
      </button>
      <Footer />
    </div>
  );
};

export default Chat;

Chat.propTypes = {
  history: propTypes.instanceOf(Object).isRequired,
};

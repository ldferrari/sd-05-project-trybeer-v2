import React, { useEffect, useState } from 'react'; // useContext
import propTypes from 'prop-types';
import { getMessagesById } from '../../services/requestAPI';
// import { verifyToken } from '../../services/webTokenMiddleware';
// import AppContext from '../../context/AppContext';
// import Header from '../../components/header';
// import Footer from '../../components/footer';
import useChat from '../useChat';
import { Link } from 'react-router-dom';

const dateFormat = require('dateformat');

const AdminChatConversation = (props) => {
  const { email } = props;
  // const { email } = useContext(AppContext);
  // const token = localStorage.getItem('token');
  // const payload = verifyToken(token);
  // const { email, id } = payload;
  // console.log('payload=====>', payload);
  // console.log('email===>', email);
  // const { Id } = props; // pega id do link/requisição/jwt
  const { messages, sendMessage, setHistory } = useChat(email); // Creates a websocket and manages messaging
  const [newMessage, setNewMessage] = useState(''); // Message to be sent
  // =>const [theOrders, setOrders] = useState([]);
  useEffect(() => {
    const { history } = props;
    if (!localStorage.getItem('token')) {
     history.push('/login');
    }
    async function fetchOldMessages() {
      const { data } = await getMessagesById(localStorage.getItem('token'), email);
      console.log(data);
      if(data.code) return false;
      setHistory(data.map(({ time, nome, message })=>({time,nome,message})))
      setNewMessage(data);
    }
    fetchOldMessages();
  }, [props]);

  
  const handleNewMessageChange = (event) => {
    const now = new Date();
    // não precisa const date = dateFormat(now, 'dd-mm-yyyy');
    const time = dateFormat(now, 'HH:MM');
    setNewMessage({ message: event.target.value, time, nome: 'Loja' });
    // precisa colocar a const time e o email além da msg ou faz isso pelo "server?"
  };

  const handleSendMessage = () => {
    sendMessage(newMessage);
    // setNewMessage('');
    newMessage.message = '';
  };
  return (
    <div className="">
      <h1 className="">{email}</h1>
      <Link to="/admin/chats" data-testid="back-button">
          Voltar
        </Link>
      <div className="messages-container">
        <ul className="messages-list">
          {messages.map((message) => (
            <li
              key={ `${message.time}-${message.message}` }
              className={ `message-item ${
                message.ownedByCurrentUser ? 'my-message' : 'received-message' // CSS!
              }` }
            >
              <p data-testid="nickname">{message.nome}</p>
              <p data-testid="message-time">{message.time}</p>
              <h2 data-testid="text-message">{message.message}</h2>
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
    </div>
  );
};

export default AdminChatConversation;

AdminChatConversation.propTypes = {
  history: propTypes.instanceOf(Object).isRequired,
};

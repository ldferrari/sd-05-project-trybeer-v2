import React, { useEffect, useState } from 'react'; // useContext
import propTypes from 'prop-types';
import { getMessagesById } from '../../services/requestAPI';
import { verifyToken } from '../../services/webTokenMiddleware';
// import AppContext from '../../context/AppContext';
import Header from '../../components/header';
import Footer from '../../components/footer';
import useChat from '../../components/useChat';

const dateFormat = require('dateformat');

const Chat = (props) => {
  // const { email } = useContext(AppContext);
  const token = localStorage.getItem('token');
  const payload = verifyToken(token);
  const { email, id } = payload;
  // console.log('payload=====>', payload);
  // console.log('email===>', email);
  // const { Id } = props; // pega id do link/requisição/jwt
  const { messages, sendMessage } = useChat(email); // Creates a websocket and manages messaging
  const [newMessage, setNewMessage] = useState(''); // Message to be sent
  // =>const [theOrders, setOrders] = useState([]);

  async function fetchOldMessages() {
    const { data } = await getMessagesById(id);
    setNewMessage(data);
  };

  useEffect(() => {
    const { history } = props;
    if (!token) {
      history.push('/login');
    }
    fetchOldMessages();
  }, [props, token]);

  const now = new Date();
  // não precisa const date = dateFormat(now, 'dd-mm-yyyy');
  const time = dateFormat(now, 'HH:mm:ss');

  const handleNewMessageChange = (event) => {
    setNewMessage({ message: event.target.value, time, nome: email });
    // precisa colocar a const time e o email além da msg ou faz isso pelo "server?"
  };

  const handleSendMessage = () => {
    sendMessage(newMessage);
    // setNewMessage('');
    newMessage.message = '';
  };
  return (
    <div className="">
      <Header>Conversar com o lodjinha</Header>
      <h1 className="">{email}</h1>
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
      <Footer />
    </div>
  );
};

export default Chat;

Chat.propTypes = {
  history: propTypes.instanceOf(Object).isRequired,
};

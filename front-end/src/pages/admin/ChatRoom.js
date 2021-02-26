import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { all } from 'sequelize/types/lib/operators'; ?
import AdminMenu from '../../components/admin/AdminMenu';
import AdminChat from '../../components/admin/AdminChat';

const { getAllMessages } = require('../../services/fetchMongo');

function ChatRoom() {
  // const [clickChat, setClickChat] = useState();
  const [allChats, setAllChats] = useState('');
  const [conversa, setConversa] = useState(false);
  const [email, setEmail] = useState('');
  // idea would be to have setClickChat(false) on the back button in AdminChat

  useEffect(() => {
    async function fetchData() {
      const getAllChats = await getAllMessages();
      setAllChats(getAllChats);
    }
    fetchData();
  }, []);

  if (conversa) {
    return (
      <div>
        <AdminMenu />
        <AdminChat email={ email } />
      </div>
    );
  }

  if (!allChats || allChats.length < 1) {
    return (
      <section>
        <AdminMenu />
        <h2>Conversas</h2>
        <h3 data-testid="text-for-no-conversation">Nenhuma conversa por aqui</h3>
      </section>
    );
  }

  if (allChats.length > 0) {
    return (
      <section>
        <AdminMenu />
        <h2>Conversas</h2>
        {console.log(conversa)}
        {allChats.map((chat, index) => (
          <div key={ index } data-testid="containerChat">
            <button
              type="button"
              id="send"
              onClick={ () => setEmail(chat.email) || setConversa(true) }
            >
              <p data-testid="profile-name">{chat.email}</p>
              <p data-testid="last-message">
                {`Última mensagem às ${chat.hour}`}
              </p>
            </button>
          </div>

        ))}
      </section>
    );
  }
}

export default ChatRoom;

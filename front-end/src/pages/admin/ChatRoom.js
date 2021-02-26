import React, { useEffect, useState } from 'react';
// import { all } from 'sequelize/types/lib/operators'; ?
import AdminChat from '../../components/admin/AdminChat';

const { getAllMessages } = require('../../services/fetchMongo');

function ChatRoom() {
  // const [clickChat, setClickChat] = useState();
  const [allChats, setAllChats] = useState('');
  // idea would be to have setClickChat(false) on the back button in AdminChat

  useEffect(() => {
    async function fetchData() {
      const getAllChats = await getAllMessages();
      console.log(getAllChats);
      setAllChats(getAllChats);
    }
    fetchData();
  }, []);

  const handleClickChat = () => <AdminChat />;

  if (!allChats || allChats.length < 1) {
    return (
      <section>
        <h2>Conversas</h2>
        <h3 data-testid="text-for-no-conversation">Nenhuma conversa por aqui</h3>
      </section>
    );
  }

  if (allChats.length > 0) {
    return (
      <section>
        <h2>Conversas</h2>
        {allChats.map((chat, index) => (
          <div key={ index }>
            <button
              data-testid="containerChat"
              type="button"
              id="send"
              onClick={ () => handleClickChat() }
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

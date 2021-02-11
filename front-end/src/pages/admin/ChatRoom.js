import React from 'react';
const { getAllMessages } = require('../../services/fetchMongo');
import AdminChat from '../../components/admin/AdminChat';

function ChatRoom() {
  // const [clickChat, setClickChat] = useState();
  // not included yet in context
  // idea would be to have setClickChat(false) on the back button in AdminChat

  useEffect(async () => {
    const allChats = await getAllMessages();
    return allChats;
  }, []);

  const handleClickChat = (emailClient) => { 
    // setClickChat(true);
    return <AdminChat emailClient />;
  };

  return (
    <section>
      {/* {!clickChat && (
        <div> */}
          <h2>Conversas</h2>
          {!allChats && <h3 data-testid="text-for-no-conversation">Nenhuma conversa por aqui</h3>}
          {allChats &&
            allChats.forEach((chat) => (
              <button
                data-testid="containerChat"
                type="button"
                id="send"
                onClick={() => handleClickChat(chat.nickname)}
              >
                <p data-testid="profile-name">{chat.nickname}</p>
                <p data-testid="last-message">Última mensagem às {chat.hour}</p>
              </button>
            ))}
        {/* // </div> */}
      {/* )} */}
      {/* {clickChat && <AdminChat allProps />}; */}
      {/* problem to pass props */}
    </section>
  );
}

export default ChatRoom;

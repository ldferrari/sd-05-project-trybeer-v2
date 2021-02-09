import React from 'react';
import AdminChat from '../../components/admin/AdminChat';

function ChatRoom() {

  const handleClickChat = (allProps) => {
    return <AdminChat allProps />;
  };
  // props que permitem identificar a conversa especifica
  // por exemplo por email ou id do cliente
  // e que retorna o componente filho AdminChat com as props

  return (
    <section>
      <h2>Conversas</h2>
      {!allChats && <h3 data-testid="text-for-no-conversation">Nenhuma conversa por aqui</h3>}
      {allChats &&
        allChats.forEach((chat) => (
          <button
            data-testid="containerChat"
            type="button"
            id="send"
            onClick={(allProps) => handleClickChat(allProps)}
          >
            <p data-testid="profile-name">{chat.email}</p>
            <p data-testid="last-message">Ultima mensagem {chat.hour}</p>
          </button>
        ))}
    </section>
  );
}

export default ChatRoom;

import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import ChatListCard from '../../components/admin/ChatListCard';
import MenuAdm from '../../components/admin/MenuAdm';
import fetchLastClientMessages from '../../services/admin/fetchLastClientMessages';

const validateToken = () => {
  const token = localStorage.getItem('token') || null;
  if (!token) return <Redirect to="/login" />;
};

const noChatsMessage = () => (
  <div
    data-testid="text-for-no-conversation"
    style={ { marginLeft: '500px' } }
  >
    Nenhuma conversa por aqui
  </div>);

function fetchMess(setChats) {
  async function fetchData() {
    const allChats = await fetchLastClientMessages();
    setChats(allChats);
  }
  fetchData();
}

const mapChatList = (({ _id, lastMessage }, index) => (<ChatListCard
  nickname={ _id }
  timestamp={ lastMessage }
  key={ index }
/>));

export default function AdminChatPage() {
  const [chats, setChats] = useState([]);
  useEffect(() => fetchMess(setChats), []);
  validateToken();

  return (
    <div>
      <MenuAdm />
      { chats.length === 0 && noChatsMessage() }
      { chats && chats.map(mapChatList) }
    </div>
  );
}

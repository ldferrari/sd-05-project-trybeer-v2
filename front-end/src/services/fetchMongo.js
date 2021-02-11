import axios from 'axios';

const API_URL = 'http://localhost:3001';

/*
Busca a lista de mensagens onde o email é o do cliente
Param: email
*/

export const getMessagesByClient = (email) => {
  const messages = axios
    .get(`${API_URL}/chat`, {})
    .then((response) => response.data);
  return messages;
};

/*
Busca a lista inteira de mensagens
Sem param
*/

export const getAllMessages = () => {
  const messages = axios
    .get(`${API_URL}/admin/chats`, {})
    .then((response) => response.data);
  return messages;
};

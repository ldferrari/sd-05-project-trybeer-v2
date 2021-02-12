import axios from 'axios';
require('dotenv').config();

  const PORT = process.env.PORT || 3001;
  const API_URL = `http://localhost:${PORT}`

/*
Busca a lista de mensagens onde o email é o do cliente
Param: email
*/

export const getMessagesByClient = (email) => {
  const messages = axios
    .get(`${API_URL}/chat`, { email })
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

/*
Cria uma mensagem no banco
*/

export const createMessage = (email, content) => {
  axios.post(`${API_URL}/chat`, { email, content });
}
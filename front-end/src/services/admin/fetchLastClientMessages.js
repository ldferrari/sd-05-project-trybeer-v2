const API = 'http://localhost:3001/admin/chats';

const fetchLastClientMessages = async () => fetch(API)
  .then((response) => response.json().then((data) => data));

export default fetchLastClientMessages;

const URL = 'http://localhost:3001/chat?nickname=';

const fetchUserMessages = (nickname) => fetch(`${URL}${nickname}`, {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  /* params: JSON.stringify({ nickname }), */
}).then((response) => response.json().then((data) => data));

export default fetchUserMessages;

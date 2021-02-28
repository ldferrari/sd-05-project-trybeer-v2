// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';

// import Header from '../components/Header';

// const socket = io('http://localhost:3001');

// socket.on('connect', () => console.log('Server online.'))

// function ClientChat() {
//   const [chatHistory, setChatHistory] = useState([]);
//   const [message, setMessage] = useState('');
//   const userData = JSON.parse(localStorage.getItem('user'));
//   const email = userData && userData.user && userData.user.email;
//   const role = userData && userData.user && userData.user.role;

//   return (
//     <section>
//       <Header title="TryBeer" />
//       <ul>
//         {chatHistory
//           && chatHistory.map((msg) => (
//             <li key={ msg.timestamp }>
//               <p data-testid="nickname">{ msg.nickname }</p>
//               <p data-testid="message-time">{ msg.timestamp }</p>
//               <p data-testid="text-message">{ msg.message }</p>
//             </li>
//           ))}
//       </ul>
//       <form>
//         <input
//           type="text"
//           data-testid="message-input"
//           onChange={ (event) => setMessage(event.target.value) }
//         />
//         <button type="submit" data-testid="send-message">
//           Enviar
//         </button>
//       </form>
//     </section>
//   );
// }

// export default ClientChat;

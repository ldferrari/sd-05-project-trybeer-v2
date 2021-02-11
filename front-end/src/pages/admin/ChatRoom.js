// import React from 'react';
// import AdminChat from '../../components/admin/AdminChat';

// function ChatRoom() {
//   // const [clickChat, setClickChat] = useState();
//   // not included yet in context
//   // idea would be to have setClickChat(false) on the back button in AdminChat

//   const handleClickChat = (allProps) => { 
//     // setClickChat(true);
//     return <AdminChat allProps />;
//   };
//   // props que permitem identificar a conversa especifica
//   // por exemplo por email ou id do cliente
//   // e que retorna o componente filho AdminChat com as props

//   return (
//     <section>
//       {/* {!clickChat && (
//         <div> */}
//           <h2>Conversas</h2>
//           {!allChats && <h3 data-testid="text-for-no-conversation">Nenhuma conversa por aqui</h3>}
//           {allChats &&
//             allChats.forEach((chat) => (
//               <button
//                 data-testid="containerChat"
//                 type="button"
//                 id="send"
//                 onClick={(allProps) => handleClickChat(allProps)}
//               >
//                 <p data-testid="profile-name">{chat.email}</p>
//                 <p data-testid="last-message">Última mensagem às {chat.hour}</p>
//               </button>
//             ))}
//         {/* // </div> */}
//       {/* )} */}
//       {/* {clickChat && <AdminChat allProps />}; */}
//       {/* problem to pass props */}
//     </section>
//   );
// }

// export default ChatRoom;

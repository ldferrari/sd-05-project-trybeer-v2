const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const moment = require('moment');
require('dotenv').config();

const usersController = require('./controllers/usersController');
const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');
const detailsController = require('./controllers/salesProductsController');
const { createMessage, getMessages } = require('./modelsMongoDb.messagesModel');

const app = express();

app.use(bodyParser.json());

// Settings to plug chat
const server = require('http').createServer(app);
const io = require('socket.io')(server);
app.use(cors());

// ENDPOINTS

app.use('/users', usersController);

app.use('/products', productsController);

app.use('/checkout', salesController);

app.use('/details', detailsController);

app.use('/images', express.static('images'));

// Chat endpoints 
// I guess SOLVED already by React and router
// app.get('/chat', async (_req, res) => {
//   const allMessages = await getMessages();
//   res.render('index', { allMessages });
  // how to send it to page instead of index?
// });
// app.get('/admin/chats', async (_req, res) => {
//   const allMessages = await getMessages();
//   res.render('index', { allMessages });
// });

// IO LISTENERS for chats, Server side.
// For both Admin and Client(beer buyer).
io.on('connection', (socket) => {
  const currentUserId = socket.id;
  const defaultNickname = 'randomName';

  console.log(`User ${currentUserId} connected`);

  onlineUsers.unshift({ id: currentUserId, nickname: defaultNickname });
  socket.emit('seeUserId', currentUserId);
  io.emit('userConnected', currentUserId, defaultNickname);

  socket.on('userChangedNickname', (newNickname) => {
    onlineUsers = onlineUsers.map((user) => {
      if (user.id === currentUserId) {
        const userToChange = user;
        userToChange.nickname = newNickname;
        return userToChange;
      }
      return user;
    });
    io.emit('showChangedNickname', currentUserId, newNickname);
  });

  socket.on('message', async ({ chatMessage, nickname }) => {
    const dateNow = new Date().getTime();
    const dateFormat = moment(dateNow).format('DD-MM-yyyy h:mm:ss A');
    const fullMessage = `${dateFormat} - ${nickname}: ${chatMessage}`;
    await createMessage({ dateFormat, nickname, chatMessage });
    io.emit('message', fullMessage);
  });

  socket.on('disconnect', () => {
    console.log(`User ${currentUserId} disconnected`);
    // [Req4] When user disconnects and needs to disappear from the list of online users
    onlineUsers = onlineUsers.filter((user) => user.id !== currentUserId);
    io.emit('userDisconnected', currentUserId);
  });
});

// PORT LISTENER
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => console.log(`Yummy, here is ${PORT} port`));
// here we chose server to be the one listening because it actually contains the app (see l19)
// see if it is || 3000 or 3001? why 3001 in V1?

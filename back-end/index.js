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

// IO LISTENERS for chats, Server side. For both Admin and Client(beer buyer).

io.on('connection', (socket) => {
  const currentUserId = socket.id;
  console.log(`User ${currentUserId} connected`);

  socket.on('message', async ({ nickname, message }) => {
    // same 'message' event for buyer and seller - seller will send "Loja" as nickname always
    const dateNow = new Date().getTime();
    const hourNow = moment(dateNow).format('HH:mm');
    await createMessage({ nickname, hour: hourNow, message });
    io.emit('showMessage', { nickname, hour, message });
  });

  socket.on('disconnect', () => {
    console.log(`User ${currentUserId} disconnected`);
    // Maybe list of online users will help for admin chat room, watch connect & disconnect
  });
});

// PORT LISTENER
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const moment = require('moment');
require('dotenv').config();

const usersController = require('./controllers/usersController');
const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');
const detailsController = require('./controllers/salesProductsController');
const chatController = require('./controllers/messageController');
const { createMessage } = require('./models/modelsMongo/messagesModel');
// PORT LISTENER
const tresMilUm = 3001;
const PORT = process.env.PORT || tresMilUm;

const app = express();

app.use(bodyParser.json());

// Settings to plug chat
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: `http://localhost:3000`,
    methods: [ 'GET', 'POST' ]
  }
});
app.use(cors());

// ENDPOINTS

app.use('/users', usersController);

app.use('/products', productsController);

app.use('/checkout', salesController);

app.use('/details', detailsController);

app.use('/chat', chatController);

app.use('/images', express.static('images'));

// IO LISTENERS for chats, Server side. For both Admin and Client(beer buyer).

io.on('connection', (socket) => {
  const currentUserId = socket.id;
  console.log(`User ${currentUserId} connected`);

  // ver logica de requisito bônus webchat para pegar email e diferenciar conversa por cliente
  socket.on('message', async ({ email, buyerMessage }) => {
    // same 'message' event for buyer and seller - seller will send "Loja" as nickname always
    const dateNow = new Date().getTime();
    const hour = moment(dateNow).format('HH:mm');
    await createMessage({ email, hour, buyerMessage });
    io.emit('showMessage', { email, hour, buyerMessage });
  });

  socket.on('disconnect', () => {
    console.log(`User ${currentUserId} disconnected`);
    // Maybe list of online users will help for admin chat room, watch connect & disconnect
  });
});

server.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});

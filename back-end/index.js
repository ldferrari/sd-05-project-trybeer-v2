require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const loginController = require('./controllers/loginController');
const registerController = require('./controllers/registerController');
const userController = require('./controllers/userController');
const productController = require('./controllers/productController');
const salesController = require('./controllers/salesController');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});
app.use(bodyParser.json());
app.use(cors());

const chatModel = require('./chatModel/chat');

app.use('/login', loginController);
app.use('/register', registerController);
app.use('/users', userController);
app.use('/products', productController);
app.use('/orders', salesController);

app.use('/images', express.static(path.join(__dirname, 'images')));

const port = 3001;
const PORT = process.env.PORT || port;
server.listen(PORT, () => console.log('Tô na escuta'));

io.on('connection', async (socket) => {
  console.log(`Guest id: ${socket.id} just joined the chat!`);

  const chatHistory = await chatModel.getChatHistory();
  socket.emit('chatHistory', chatHistory);

  socket.on('saveMessage', async (payload) => {
    const { message, nickname } = payload;
    const result = await chatModel.sendMessage(message, nickname);
    io.emit('sendMessage', result);
  });

  socket.on('disconnect', () => {
    console.log(`Guest id: ${socket.id} just left.`);
  });
});

// const socketPort = 3003;
// server.listen(socketPort, () => console.log('Escuto o chat'));

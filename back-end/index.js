const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const dateFormat = require('dateformat');
const errorMiddleware = require('./middlewares/error');
const userController = require('./controllers/userController');
const productsController = require('./controllers/productsController.js');
const ordersController = require('./controllers/ordersController.js');
const salesController = require('./controllers/salesController.js');
const checkoutController = require('./controllers/checkoutController');
const {
  createMessage,
  getMessagesByNickname,
  getLastClientMessages
} = require('./chat/models/Messages');

const app = express();
const socketIo = require('socket.io');
const http = require('http');
const httpServer = http.createServer(app);
const io = socketIo(httpServer, {
  cors: {
    origin: 'http://localhost:3000', // url aceita pelo cors
    methods: ['GET', 'POST'], // Métodos aceitos pela url
  },
});
/* const index = require('../front-end/src/pages/client/ClientChatPage'); */

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

/* app.use(index); */
app.use('/', userController);
app.use('/orders', ordersController);
app.use('/admin/orders', salesController);
app.use('/checkout', checkoutController);
app.use('/products', productsController);
app.use(errorMiddleware);

app.use('/images/', express.static(path.join(__dirname, '/images')));

app.get('/admin/chats', async (req, res) => {
  const successCode = 200;

  const allMessages = await getLastClientMessages();
  return res.status(successCode).json(allMessages);
});

app.get('/chat', async (req, res) => {
  const { nickname } = req.query;
  const successCode = 200;

  const allMessages = await getMessagesByNickname(nickname);
  return res.status(successCode).json(allMessages);
});

io.on('connection', async(socket) => {
  console.log('A user connected.');

  socket.on('message', async ({ nickname, message, role }) => {
    const timestamp = dateFormat(new Date(), 'HH:MM');
    await createMessage({ nickname, message, timestamp, role });
    io.emit('message', { nickname, timestamp, message });
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const PORT = 3001;
httpServer.listen(PORT, () => console.log(`Ouvindo na porta ${PORT}`));

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const moment = require('moment');

const loginController = require('./controllers/loginController');
const registerController = require('./controllers/registerController');
const userController = require('./controllers/userController');
const productController = require('./controllers/productController');
const salesController = require('./controllers/salesController');
const adminController = require('./controllers/adminController');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const {
  createMessage,
  getUserChatHistory,
  getRecentMessages,
} = require('./chatModel/chat');

app.use('/login', loginController);
app.use('/register', registerController);
app.use('/users', userController);
app.use('/products', productController);
app.use('/orders', salesController);
app.use('/admin/orders', adminController);

app.use('/images', express.static(path.join(__dirname, 'images')));

app.get('/admin/chats', async (_req, res) => {
  const status200 = 200;
  const recentMessages = await getRecentMessages();

  return res.status(status200).json(recentMessages);
});

app.get('/chat', async (req, res) => {
  const { nickname } = req.query;
  const status200 = 200;
  const chatHistory = await getUserChatHistory(nickname);

  return res.status(status200).json(chatHistory);
});

io.on('connection', async (socket) => {
  console.log(`User id: ${socket.id} joined the room!`);

  socket.on('message', async ({ nickname, message, role }) => {
    const timestamp = moment(new Date()).format('hh:mm');
    await createMessage({ nickname, message, timestamp, role });
    io.emit('message', { nickname, timestamp, message });
  });

  socket.on('disconnect', () => {
    console.log(`User id: ${socket.id} left the room...`);
  });
});

const port = 3001;
const PORT = process.env.PORT || port;
server.listen(PORT, () => console.log('Tô na escuta'));

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const moment = require('moment');
const users = require('./controllers/usersController');
const login = require('./controllers/loginController');
const products = require('./controllers/productsController');
const orders = require('./controllers/ordersController');
const {
  createMessage,
  getUserMessages,
  getAdmMessages,
} = require('./models/mongoDB/Chat');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

// require('dotenv').config({ path: `${__dirname}/../.env` });
require('dotenv').config();

const portBackEnd = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use('/users', users);
app.use('/login', login);
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/products', products);
app.use('/orders', orders);

app.get('/', (_request, response) => {
  response.send();
});
const code200 = 200;
app.get('/chat', async (req, res) => {
  const { nickname } = req.query;
  const chatMessages = await getUserMessages(nickname);
  return res.status(code200).json(chatMessages);
});

app.get('/admin/chats', async (req, res) => {
  const lastMessages = await getAdmMessages();
  console.log(lastMessages);
  return res.status(code200).json(lastMessages);
});
const formatDate = 'HH:mm';
io.on('connection', async (socket) => {
  console.log(`${socket.id} conectou`);

  socket.on('message', async ({ nickname, chatMessage }) => {
    const time = moment(Date.now()).format(formatDate);
    await createMessage(nickname, chatMessage, time);
    io.emit('message', { nickname, chatMessage, time });
  });
});
const PORT = process.env.PORT || portBackEnd;

server.listen(PORT, () => console.log(`listening on ${PORT}`));
//

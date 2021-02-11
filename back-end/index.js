const express = require('express');

const http = require('http');
// const socketIO = require('socket.io');
// https://www.npmjs.com/package/dateformat, um oferecimento de Paulo D'Andrea
// const dateFormat = require('dateformat');

const app = express();
const server = http.createServer(app);
// const io = socketIO(server);
const io = require('socket.io')(server, {
  cors: {
  origin: '*',
  },
});

const path = require('path');

const cors = require('cors');

const bodyParser = require('body-parser');

const loginController = require('./Controllers/loginController');

const registerController = require('./Controllers/userController');

const profileController = require('./Controllers/profileControllers');

const checkToken = require('./Middlewares/checkToken');

const productsController = require('./Controllers/productsController');

const checkoutController = require('./Controllers/checkoutController');

const ordersController = require('./Controllers/ordersController');

const adminOrdersController = require('./Controllers/adminOrdersController');

const detailController = require('./Controllers/detailController');

const admProfileController = require('./Controllers/admProfileController');

const admDetailController = require('./Controllers/admDetailController');

const chatController = require('./Chat/controller/chatController');

/*
  ENDPOINTS
*/
app.use(cors());

app.use(bodyParser.json());

app.use('/login', loginController);

app.use('/register', registerController);

app.use('/profile', checkToken, profileController);

app.use('/products', checkToken, productsController);

app.use('/checkout', checkToken, checkoutController);

app.use('/orders', checkToken, ordersController);

app.use('/admin/orders', checkToken, adminOrdersController);

app.use('/orders', checkToken, detailController);

app.use('/admin/profile', checkToken, admProfileController);

app.use('/admin/orders', checkToken, admDetailController);

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/', chatController);

/* const PORT = 3001;

app.listen(PORT, () => {
  console.log(`O pai tá ON no projeto e na porta ${PORT}`);
});
 */

const PORT = 3001;
const NEW_CHAT_MESSAGE_EVENT = 'newChatMessage';
io.on('connection', (socket) => {
  // Join a conversation
  const { ID } = socket.handshake.query;
  socket.join(ID);

  // Listen for new messages
  socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
    console.log('data back===>', data);
    io.in(ID).emit(NEW_CHAT_MESSAGE_EVENT, data);
  });

  // Leave the room if the user closes the socket
  // socket.on("disconnect", () => {
  // socket.leave(roomId);
  // });
});

server.listen(PORT, () => {
  console.log(`O pai tá ON no projeto e na porta ${PORT}`);
});

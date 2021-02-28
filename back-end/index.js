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

app.use('/login', loginController);
app.use('/register', registerController);
app.use('/users', userController);
app.use('/products', productController);
app.use('/orders', salesController);

app.use('/images', express.static(path.join(__dirname, 'images')));

const port = 3001;
const PORT = process.env.PORT || port;
server.listen(PORT, () => console.log('Tô na escuta'));


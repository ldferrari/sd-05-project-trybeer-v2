const express = require('express');
const path = require('path');

const app = express();
const cors = require('cors');
const server = require('http').createServer(app);

const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

app.use(cors);

const messages = require('./models/Messages.js');

app.get('/', async(req, res) => {
  return res.render(); // client
});

io.on('connection', async (socket) => {
  console.log(`Socket conectado ${socket.id}`);
  socket.on('sendMessage', (data) => {
    console.log(data);
  });
});
const socketIo = require('socket.io');
const { checkToken } = require('../auth/jwt.auth');

const ZERO = 0;

const users = {};

const formatMessage = (from, to) => (message) => ({
  from,
  to,
  message,
  createdAt: new Date(),
});

const run = (...server) => async ({ mongoConnection, mysqlConnection }) => {
  // Setup connection
  const io = socketIo(...server);
  const { user } = mysqlConnection; 

  io.on('connection', async (socket) => {

    socket.on('init_user', async (token) => {
      try {
        const { payload } = checkToken(token);
        users[payload.id] = { ...payload };
      } catch ({ message }) {
        console.error(message);
      }
    });

    // Criei esse socket para uma versão mais robusta do chat
    socket.on('message', async ({ fromId, toId, message }) => {
      if(!users[fromId]) return;
      const messageCollection = await mongoConnection('messages');
      
      // Aqui vou registrar o buffer no mongo
      // Preciso buscar os dados do 'to' para configurar o messageBuff
      const messageBuffer = formatMessage(users[fromId], {})(message);

      if (toId) {
        try {
          const { dataValues } = await user.findOne({
            where: { id: toId },
            attributes: ['id', 'name', 'email', 'role'],
          });
          messageBuffer.to = dataValues;
        } catch (err) {
          console.error(err.message);
        }
      }
      await messageCollection.insertOne(messageBuffer);
      io.emit('loja', messageBuffer);
      io.emit(fromId, messageBuffer);
    });

    socket.on('disconnect', (fromId) => {
      delete users[fromId];
      socket.disconnect(ZERO);
    });
  });
};

module.exports = {
  users,
  run,
};

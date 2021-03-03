const connection = require('./connection');

const createMessage = async (nickname, chatMessage, time) => {
  const con = await connection();
  const createdMessage = await con.collection('messages').insertOne({
    nickname,
    chatMessage,
    time,
  });
  return createdMessage.ops[0];
};

const getUserMessages = async (userName) => {
  const con = await connection();
  const getM = await con.collection('messages').find({ userName }).toArray();
  return getM;
};
const getAdmMessages = async () => {
  const con = await connection();
  const getM = await con
    .collection('messages')
    .aggregate([
      {
        $sort: { time: -1 },
      },
      {
        $group: { _id: '$nickname', ultimaMensagem: { $first: '$time' } },
      },
    ])
    .toArray();
  return getM;
};

module.exports = {
  createMessage,
  getUserMessages,
  getAdmMessages,
};

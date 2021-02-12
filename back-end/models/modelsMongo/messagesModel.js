const connection = require('./connection');

const createMessage = async ({ nickname, hour, message }) => {
  try {
    const newMessage = await connection().then((db) =>
      db.collection('messages').insertOne({ nickname, hour, message }));
    // console.log(newMessage); saw that object is inside ops array
    return newMessage.ops[0];
  } catch (err) {
    console.log(err);
  }
};

const getMessages = async () => {
  try {
    const allMessages = await connection().then((db) =>
      db.collection('messages').find().toArray());
    return allMessages;
  } catch (err) {
    console.log(err);
  }
};

const getMessagesByClient = async (email) => {
  try {
    const messagesByClient = await connection().then((db) =>
      db.collection('messages').find(email).toArray());
    return messagesByClient;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createMessage,
  getMessages,
  getMessagesByClient,
};

const connection = require('./connection');

const getConversation = async (idUser) => connection()
  .then((db) => db.collection(idUser).find()
    .toArray());

const getAllConversations = async () => connection().then((db) => db.listCollections().toArray());

const insertMessage = async (idUser, conversation) => {
  const { nome, time, message } = conversation;
  return connection().then((db) => db.collection(idUser).insertOne({ nome, time, message }));
};

const lastConversation = async (colletion) => {
  return connection().then((db) => db.collection(colletion).find().sort({ _id:-1 }).limit(1).toArray());
};


module.exports = {
  getConversation,
  insertMessage,
  getAllConversations,
  lastConversation,
};

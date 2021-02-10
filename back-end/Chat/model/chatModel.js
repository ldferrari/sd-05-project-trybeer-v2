const connection = require('./connection');

const getConversation = async (idUser) => connection()
  .then((db) => db.collection(idUser).find().toArray());

const getAllConversations = async () => connection().then((db) => db.getCollectionNames());

const insertMessage = async (idUser, conversation) => {
  const { name, time, message } = conversation;
  return connection().then((db) => db.collection(idUser).insertOne({ name, time, message }));
}

module.exports = {
  getConversation,
  insertMessage,
  getAllConversations,
};

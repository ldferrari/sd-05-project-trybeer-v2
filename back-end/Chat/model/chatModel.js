const connection = require('./connection');
const collection = 'messages';
const getConversation = async (email) => connection()
  .then((db) => db.collection(collection).find({ where: { email }}));

const getAllConversations = async () => connection().then((db) => db.collection(collection).find().toArray());

const insertMessage = async (email, conversation) => {
  const { nome, time, message } = conversation;
  return connection().then((db) => db.collection(collection)
    .update({$push: { nome, time, message } }, { where: { email } }));
  // .collection(idUser).insertOne({ nome, time, message }));
};

const lastConversation = async (colletion) => connection()
  .then((db) => db.collection(colletion).find()
    .sort({ _id: -1 })
    .limit(1)
    .toArray());

module.exports = {
  getConversation,
  insertMessage,
  getAllConversations,
  lastConversation,
};

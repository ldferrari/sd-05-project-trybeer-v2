const { ObjectId } = require('mongodb');
const connection = require('./connection');
const moment = require('moment');

async function getChatHistory() {
  const messages = await connection().then((db) =>
    db.collection('messages').find().toArray(),
  );

  return messages.map((message) => {
    const { _id: id } = message;
    const timestamp = new Date(ObjectId(id).getTimestamp());
    const date = moment(timestamp).format('HH:mm');

    return { ...message, date };
  });
}

async function sendMessage(message, nickname) {
  const newMessage = await connection().then((db) =>
    db.collection('messages').insertOne({ message, nickname }));
  const { _id: id } = message;
  const timestamp = new Date(ObjectId(id).getTimestamp());
  const date = moment(timestamp).format('HH:mm');

  return { ...newMessage.ops[0], date };
}

module.exports = { getChatHistory, sendMessage };

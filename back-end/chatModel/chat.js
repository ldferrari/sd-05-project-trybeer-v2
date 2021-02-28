const connection = require('./connection');

const createMessage = async ({ nickname, message, timestamp }) => {
  try {
    const newMessage = await connection()
      .then((db) => db.collection('messages')
        .insertOne({ nickname, message, timestamp }));

    return newMessage;
  } catch (error) {
    console.error(error.message);

    return error.message;
  }
};

async function getUserChatHistory(nickname) {
  try {
    const messages = await connection().then((db) => db.collection('messages')
      .find({ nickname }).toArray());

    return messages;
  } catch (error) {
    console.error(error.message);

    return error.message;
  }
}

module.exports = {
  createMessage,
  getUserChatHistory,
};

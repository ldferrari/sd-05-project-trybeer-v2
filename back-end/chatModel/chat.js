const connection = require('./connection');

const createMessage = async ({ nickname, message, timestamp }) => {
  try {
    const newMessage = await connection().then((db) =>
      db.collection('messages').insertOne({ nickname, message, timestamp }),
    );

    return newMessage;
  } catch (error) {
    console.error(error.message);

    return error.message;
  }
};

async function getUserChatHistory(nickname) {
  try {
    const messages = await connection().then((db) =>
      db.collection('messages').find({ nickname }).toArray(),
    );

    return messages;
  } catch (error) {
    console.error(error.message);

    return error.message;
  }
}

async function getRecentMessages() {
  try {
    const recentMessages = await connection().then((db) =>
      db
        .collection('messages')
        .aggregate([
          { $sort: { timestamp: -1 } },
          { $group: { _id: '$nickname', lastMessage: { $first: '$timestamp' } } },
        ])
        .toArray(),
    );

    return recentMessages;
  } catch (error) {
    console.error(error.message);

    return error.message;
  }
}

module.exports = {
  createMessage,
  getUserChatHistory,
  getRecentMessages,
};

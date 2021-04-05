const connection = require('./mongoConnection');


const createMessage = async ({ nickname, message, timestamp }) => {
  try {
    const dbMessage = await connection()
      .then((db) => db.collection('messages')
        .insertOne({ nickname, message, timestamp }));

    return dbMessage;
  } catch (error) {
    console.error(error.message);

    return error.message;
  }
};

async function getLastClientMessages() {
  try {
    const messages = await connection().then((db) => db.collection('messages')
      .aggregate([
        {
          $sort: { timestamp: -1 }
        },
        {
          $group: { _id: '$nickname', lastMessage: { $first: '$timestamp' } }
        }])
      .toArray());

    return messages;
  } catch (error) {
    console.error(error.message);

    return error.message;
  }
}

async function getMessagesByNickname(nickname) {
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
  getMessagesByNickname,
  getLastClientMessages,
};

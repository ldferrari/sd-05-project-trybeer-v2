const model = require('../model/chatModel');

const getConversation = async (userId) => {
  if (!userId) {
    return {
      error: true,
      code: 'Invalid_value',
      message: 'Informe um usuário válido.',
      statusCode: 401,
    };
  }
  return model.getConversation(userId);
};

const insertMessage = async (userId, conversation) => {
  if (!userId) {
    return {
      error: true,
      code: 'Invalid_value',
      message: 'Id inválido.',
      statusCode: 401,
    };
  }
  if (!conversation.name) {
    return {
      error: true,
      code: 'Invalid_value',
      message: 'Usuário não identificado.',
      statusCode: 401,
    };
  }
  if (!conversation.time) {
    return {
      error: true,
      code: 'Invalid_value',
      message: 'Hora inválida.',
      statusCode: 401,
    };
  }
  if (!conversation.message) {
    return {
      error: true,
      code: 'Invalid_value',
      message: 'Mensagem inválida.',
      statusCode: 401,
    };
  }
  return model.updateConversation(userId, conversation);
};

const getAllConversations = async () => model.getAllConversations();

module.exports = {
  getConversation,
  insertMessage,
  getAllConversations,
};

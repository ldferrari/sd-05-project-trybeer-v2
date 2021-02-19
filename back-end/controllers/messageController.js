const { Router } = require('express');
const moment = require('moment');
const { getMessages, createMessage } = require('../models/modelsMongo/messagesModel');

const chat = Router();
const codeOk = 200;
const codeErr = 500;
const errMessage = 'algo deu errado :(';

chat.get('/', async (_req, res) => {
  try {
    const allMessages = await getMessages();
    res.status(codeOk).json(allMessages);
  } catch (_e) {
    res.status(codeErr).send(errMessage);
  }
});

chat.post('/', async (req, _res) => {
  try {
    const { email, content } = req.body;
    const dateNow = new Date().getTime();
    const hour = moment(dateNow).format('HH:mm');
    createMessage({ email, hour, content });
  } catch (_e) {
    res.status(codeErr).send(errMessage);
  }
})

module.exports = chat;

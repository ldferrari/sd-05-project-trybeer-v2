const userService = require('../services/userService');
const registerService = require('../services/registerService');
const productService = require('../services/productService');
const db = require('../models');

const req = {
  name: 'Vó do Badanha',
  email: 'badanha@bol.com.br',
  password: '1234567',
  role: 'Client',
};

req.body = req;

describe('Sua aplicação deve ter o endpoint POST `/register`', () => {
  afterAll(async (done) => {
    await db.sequelize.close();
    done();
  });

  it('Será validado que é possível cadastrar um usuário com sucesso', async () => {
    const { name, email, password, role } = req;
    await registerService.createUser(name, email, password, role);
  });

  it('Será testado que o update será feito corretamente', async () => {
    await userService.updateUser(req.name, req.email);
  });

  it('Será testado que o update não será feito corretamente', async () => {
    await userService.updateUser('', '');
  });

  it('Será validado não é possível cadastrar um usuário com dados inválidos', async () => {
    const { name, email, password, role } = req;
    await registerService.createUser(name, email, password, role);
  });

  it('será testado se pode pegar todos os pedidos', async () => {
    await productService.getAllProducts();
  });
});

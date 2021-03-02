const userService = require('../services/userService');
const loginService = require('../services/loginService');
const db = require('../models');

const zero = 0;

const req = {
  name: 'Vó do Badanha',
  email: 'badanha@bol.com.br',
  password: '1234567',
};

describe('Sua aplicação deve ter o endpoint POST /login', () => {
  afterAll(async (done) => {
    await db.sequelize.close();
    done();
  });

  it('Será testado se o login é executado corretamente', async () => {
    req.body = req;
    await loginService.userLogin(req.email, req.password);
  });

  it('Será testado se o login retorna nulo', async () => {
    req.body = { email: 'tryber@trybe.com.br', password: '97845612' };
    await loginService.userLogin(req.email, req.password);
  });
});

describe('Sua aplicação checa se o usuário existe', () => {
  afterAll(async (done) => {
    await db.sequelize.close();
    done();
  });

  it('Será testado se o usuario já existe', async () => {
    req.body = req;
    const user = await userService.updateUser(req.name, req.email);

    expect(user).toStrictEqual([zero]);
  });
});

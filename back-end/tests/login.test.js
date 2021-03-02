const loginService = require('../services/loginService');
const db = require('../models');

const req = {
  email: 'zebirita@gmail.com',
  password: '12345678',
};

const fail_req = {
  email: 'birita@gmail.com',
  password: '12345678',
};

describe('Sua aplicação deve ter o endpoint POST `/login`', () => {
  afterAll(async (done) => {
    await db.sequelize.close();
    done();
  });

  it('Será validado que é possível fazer login com sucesso', async () => {
    req.body = req;
    await loginService.userLogin(req.email, req.password);
  });

  it('Será validado que não é possivel fazer login', async () => {
    req.body = fail_req;
    await loginService.userLogin(req.email, req.password);
  });
});

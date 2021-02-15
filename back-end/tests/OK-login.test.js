const frisby = require('frisby');
const shell = require('shelljs');

const url = 'http://localhost:3001';

describe('Sua aplicação deve ter o endpoint POST `/login`', () => {
  beforeAll(async () => {
    shell.exec('npx sequelize-cli db:drop');
    shell.exec('npx sequelize-cli db:create && npx sequelize-cli db:migrate $');
    shell.exec('npx sequelize-cli db:seed:all $');
  });

  it('Será validado que é possível fazer login com sucesso', async () => {
    await frisby
      .post(`${url}/login`,
        {
          email: 'zebirita@gmail.com',
          password: '12345678',
        })
      .expect('status', 200)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.token).not.toBeNull();
      });
  });

  it('Será validado que não é possível fazer login sem o campo `email`', async () => {
    await frisby
      .post(`${url}/login`,
        {
          password: '12345678',
        })
      .expect('status', 401)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('Todos os campos devem ser preenchidos!');
      });
  });

  it('Será validado que não é possível fazer login sem o campo `password`', async () => {
    await frisby
      .post(`${url}/login`,
        {
          email: 'zebirita@gmail.com',
        })
      .expect('status', 401)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('Todos os campos devem ser preenchidos!');
      });
  });

  it('Será validado que não é possível fazer login com o campo `email` em branco', async () => {
    await frisby
      .post(`${url}/login`,
        {
          email: '',
          password: '12345678',
        })
      .expect('status', 401)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('Todos os campos devem ser preenchidos!');
      });
  });

  it('Será validado que não é possível fazer login com o campo `password` em branco', async () => {
    await frisby
      .post(`${url}/login`,
        {
          email: 'zebirita@gmail.com',
          password: '',
        })
      .expect('status', 401)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('Todos os campos devem ser preenchidos!');
      });
  });

  it('Será validado que não é possível fazer login com um usuário que não existe', async () => {
    await frisby
      .post(`${url}/login`,
        {
          email: 'menorIdade@gmail.com',
          password: '12345678',
        })
      .expect('status', 401)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('Email não encontrado.');
      });
  });
});

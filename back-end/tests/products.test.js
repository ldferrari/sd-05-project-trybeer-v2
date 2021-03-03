const frisby = require('frisby');
const shell = require('shelljs');

const url = 'http://localhost:3001';

const listaProdutos = [
  {
    id: 1,
    name: 'Skol Lata 250ml',
    price: 2.2,
    url_image: 'http://localhost:3001/images/Skol Lata 350ml.jpg',
  },
  {
    id: 2,
    name: 'Heineken 600ml',
    price: 7.5,
    url_image: 'http://localhost:3001/images/Heineken 600ml.jpg',
  },
  {
    id: 3,
    name: 'Antarctica Pilsen 300ml',
    price: 2.49,
    url_image: 'http://localhost:3001/images/Antarctica Pilsen 300ml.jpg',
  },
  {
    id: 4,
    name: 'Brahma 600ml',
    price: 7.5,
    url_image: 'http://localhost:3001/images/Brahma 600ml.jpg',
  },
  {
    id: 5,
    name: 'Skol 269ml',
    price: 2.19,
    url_image: 'http://localhost:3001/images/Skol 269ml.jpg',
  },
  {
    id: 6,
    name: 'Skol Beats Senses 313ml',
    price: 4.49,
    url_image: 'http://localhost:3001/images/Skol Beats Senses 313ml.jpg',
  },
  {
    id: 7,
    name: 'Becks 330ml',
    price: 4.99,
    url_image: 'http://localhost:3001/images/Becks 330ml.jpg',
  },
  {
    id: 8,
    name: 'Brahma Duplo Malte 350ml',
    price: 2.79,
    url_image: 'http://localhost:3001/images/Brahma Duplo Malte 350ml.jpg',
  },
  {
    id: 9,
    name: 'Becks 600ml',
    price: 8.89,
    url_image: 'http://localhost:3001/images/Becks 600ml.jpg',
  },
  {
    id: 10,
    name: 'Skol Beats Senses 269ml',
    price: 3.57,
    url_image: 'http://localhost:3001/images/Skol Beats Senses 269ml.jpg',
  },
  {
    id: 11,
    name: 'Stella Artois 275ml',
    price: 3.49,
    url_image: 'http://localhost:3001/images/Stella Artois 275ml.jpg',
  },
];

describe('Sua aplicação deve ter o endpoint GET `/products`', () => {
  beforeAll(async () => {
    shell.exec('npx sequelize-cli db:drop');
    shell.exec('npx sequelize-cli db:create && npx sequelize-cli db:migrate $');
    shell.exec('npx sequelize-cli db:seed:all $');
  });

  it('Será validado que a resposta da endpoint não é nula', async () => {
    const token = await frisby
      .post(`${url}/register`, {
        name: 'Usuario novinho',
        email: 'usuario@novo.com',
        password: '12345678',
        role: 'client',
      })
      .expect('status', 201)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        return result.token;
      });
    await frisby
      .setup({
        request: {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        },
      })
      .get(`${url}/products`)
      .expect('status', 200)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result).not.toBeNull();
      });
  });
  it('Será validado que o tamanho do array de produtos da resposta do endpoint não é zero', async () => {
    const token = await frisby
      .post(`${url}/login`, {
        email: 'usuario@novo.com',
        password: '12345678',
      })
      .expect('status', 200)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        return result.token;
      });
    await frisby
      .setup({
        request: {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        },
      })
      .get(`${url}/products`)
      .expect('status', 200)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.length).not.toBe(0);
      });
  });
  it('Será validado que o tamanho do array de produtos da resposta do endpoint é onze', async () => {
    const token = await frisby
      .post(`${url}/login`, {
        email: 'usuario@novo.com',
        password: '12345678',
      })
      .expect('status', 200)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        return result.token;
      });
    await frisby
      .setup({
        request: {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        },
      })
      .get(`${url}/products`)
      .expect('status', 200)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.length).toBe(11);
      });
  });
  it('Será validado que não é possível ver os produtos se o usuário não estiver logado', async () => {
    await frisby
      .get(`${url}/products`)
      .expect('status', 401)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('No autorization.');
      });
  });
  it('Será validado que a lista de produtos recebidas é igual a lista de produtos esperada', async () => {
    const token = await frisby
      .post(`${url}/login`, {
        email: 'usuario@novo.com',
        password: '12345678',
      })
      .expect('status', 200)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        return result.token;
      });
    await frisby
      .setup({
        request: {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        },
      })
      .get(`${url}/products`)
      .expect('status', 200)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result).toEqual(listaProdutos);
      });
  });
});

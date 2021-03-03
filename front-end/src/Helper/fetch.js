import localStorage from './localStorageHandle';

const TypeJSON = 'application/json';

const SERVER_URL = 'http://localhost:3001';

const treatResponse = (response) => (
  response
    .json()
    .then((json) => Promise.resolve(json))
    .catch((err) => Promise.reject(err))
);

const myInit = {
  mode: 'cors',
  method: 'GET',
  headers: {
    'Content-Type': TypeJSON,
  },
};

const myInitWithBody = (data, token) => ({
  mode: 'cors',
  method: 'POST',
  headers: {
    'Content-Type': TypeJSON,
    Authorization: token || localStorage.getDataByKey('token') || '',
  },
  body: JSON.stringify(data),
});

// Use esta aqui ou outra que não envolva retorno do retorno do ternário:

// prettier-ignore
const getProducts = () => (
  fetch(`${SERVER_URL}/products`, myInit).then((response) => treatResponse(response))
);

// prettier-ignore
const getUser = (data) => (
  fetch(`${SERVER_URL}/`, myInitWithBody(data))
    .then((response) => treatResponse(response))
);

const login = ({ email, password }) => (
  fetch(`${SERVER_URL}/`, myInitWithBody({ email, password }))
    .then((response) => treatResponse(response))
);

// prettier-ignore
const updateUser = (data) => {
  const token = localStorage.getDataByKey('token');
  return fetch(`${SERVER_URL}/update`, myInitWithBody(data, token))
    .then((response) => treatResponse(response));
};

// [REFATORAR] - Precisamos retornar o status da requisição para saber se houve um erro
const submitOrderFetch = (data) => (
  fetch(`${SERVER_URL}/sales`, myInitWithBody(data))
    .then((response) => treatResponse(response))
);
// prettier-ignore
const registerUser = (data) => (
  fetch(`${SERVER_URL}/register`, myInitWithBody(data)).then(
    (response) => response
      .json()
      .then((json) => {
        if (json.message) {
          return Promise.reject(json.message);
        }
        return Promise.resolve(json);
      })
      .catch((err) => Promise.reject(err)),
  )
);

const clientSalesByUserId = (id) => (
  fetch(`${SERVER_URL}/sales/user/${id}`, myInitWithBody)
    .then((response) => treatResponse(response))
);

const salesById = (id) => (
  fetch(`${SERVER_URL}/sales/${id}`, myInitWithBody)
    .then((response) => treatResponse(response))
);

const getSalesOrder = () => fetch(`${SERVER_URL}/sales`, myInit)
  .then((response) => treatResponse(response));

const updateStatusFetchFlag = (data, token) => ({
  mode: 'cors',
  method: 'PUT',
  headers: {
    'Content-Type': TypeJSON,
    Authorization: token || '',
  },
  body: JSON.stringify(data),
});

const updateDeliveryStatus = (id, status) => (
  fetch(`${SERVER_URL}/sales/status`, updateStatusFetchFlag({ id, status }))
    .then((response) => response
      .json()
      .then((json) => Promise.resolve(json))
      .catch((err) => Promise.reject(err.response)))
);

export default {
  SERVER_URL,
  getProducts,
  getUser,
  login,
  updateUser,
  submitOrderFetch,
  registerUser,
  clientSalesByUserId,
  salesById,
  getSalesOrder,
  updateStatusFetchFlag,
  updateDeliveryStatus,
};

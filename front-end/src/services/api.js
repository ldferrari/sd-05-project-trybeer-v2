const url = 'http://localhost:3001';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};

export const checkUser = async (email, password) => {
  const myInit = {
    method: 'POST',
    headers,
    mode: 'cors',
    body: JSON.stringify({ email, password }),
  };
  const response = await fetch(`${url}/login`, myInit).then((user) => user.json());
  return response || undefined;
};

export const registerUser = async (userData) => {
  const registerReq = {
    method: 'POST',
    headers,
    mode: 'cors',
    body: JSON.stringify(userData),
  };
  const response = await fetch(`${url}/users/register`, registerReq)
    .then((res) => res.json());
  return response || undefined;
};

export const getUserByEmail = async (email, token) => {
  const updateReq = {
    method: 'GET',
    headers: { ...headers, Authorization: token },
    mode: 'cors',
  };
  const response = await fetch(`${url}/users/profile?email=${email}`, updateReq)
    .then((userData) => userData.json());
  return response || undefined;
};

export const updateUserName = async (userData, token) => {
  const updateReq = {
    method: 'PUT',
    headers: { ...headers, Authorization: token },
    mode: 'cors',
    body: JSON.stringify(userData),
  };
  const response = await fetch(`${url}/users/update`, updateReq)
    .then((res) => res.json());
  return response || undefined;
};

export const getProducts = async (email, token) => {
  const updateReq = {
    method: 'GET',
    headers: { ...headers, Authorization: token },
    mode: 'cors',
  };
  const response = await fetch(`${url}/products?email=${email}`, updateReq)
    .then((products) => products.json());
  return response || undefined;
};

export const orderPlaced = async (order, email, token) => {
  const registerReq = {
    method: 'POST',
    headers: { ...headers, Authorization: token },
    mode: 'cors',
    body: JSON.stringify({ email, order }),
  };
  const response = await fetch(`${url}/orders/insert`, registerReq)
    .then((res) => res.json());
  return response || undefined;
};

export const getOrders = async (email, token) => {
  const updateReq = {
    method: 'GET',
    headers: { ...headers, Authorization: token },
    mode: 'cors',
  };
  const response = await fetch(`${url}/orders?email=${email}`, updateReq)
    .then((products) => products.json());
  return response || undefined;
};

export const getOrderById = async (token, id) => {
  const updateReq = {
    method: 'GET',
    headers: { ...headers, Authorization: token },
    mode: 'cors',
  };
  // const response = await fetch(`${url}/orders/${id}?email=${email}`, updateReq)
  const response = await fetch(`${url}/orders/${id}`, updateReq)
    .then((products) => products.json());
  return response || undefined;
};

export const getOrdersAdmin = async (role, token) => {
  const request = {
    method: 'GET',
    headers: { ...headers, Authorization: token, role },
    mode: 'cors',
  };
  const response = await fetch(`${url}/orders/admin`, request)
    .then((orders) => orders.json());
  return response || undefined;
};

export const getAdmOrderById = async (role, id, token) => {
  const updateReq = {
    method: 'GET',
    headers: { ...headers, Authorization: token, role },
    mode: 'cors',
  };
  const response = await fetch(`${url}/orders/admin/${id}`, updateReq)
    .then((products) => products.json());
  return response || undefined;
};

export const updateStatus = async (role, id, token, orderStatus) => {
  const updateReq = {
    method: 'PUT',
    headers: { ...headers, Authorization: token, role },
    body: JSON.stringify({ orderStatus }),
    mode: 'cors',
  };
  const response = await fetch(`${url}/orders/admin/${id}`, updateReq)
    .then((order) => order.json());
  return response || undefined;
};

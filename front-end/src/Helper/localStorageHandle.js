const trybeerData = {
  token: '',
};

const LocalMsgError = 'Localstorage not suported';

const clearAll = () => {
  if (!window.localStorage) throw new Error(LocalMsgError);
  localStorage.removeItem('trybeer');
};

const registerData = (data) => {
  if (!window.localStorage) throw new Error(LocalMsgError);
  const current = localStorage.getItem('trybeer');
  if (!current) localStorage.setItem('trybeer', JSON.stringify(trybeerData));
  const newData = { ...JSON.parse(current), ...data };
  localStorage.setItem('trybeer', JSON.stringify(newData));
};

const getDataByKey = (key) => {
  if (!window.localStorage) throw new Error(LocalMsgError);
  const current = localStorage.getItem('trybeer');
  if (!current) return null;
  return JSON.parse(current)[key] || {};
};

export default {
  clearAll,
  registerData,
  getDataByKey,
};

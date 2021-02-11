import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import AppContext from './AppContext';

const initialCard = () => {
  const localCart = localStorage.getItem('cart');
  return localCart ? JSON.parse(localCart) : [];
};

const updateCard = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

function Provider({ children }) {
  const [userName, setUserName] = useState('');
  const [nomeProfile, setNomeProfile] = useState('Eder Sena');
  const [emailProfile, setEmailProfile] = useState('');
  const [cart, setCart] = useState([]);
  const [globalData, setGlobalData] = useState({});
  const [orderDetails, setOrderDetails] = useState([]);
  const [alertCompraFinalizada, setAlertCompraFinalizada] = useState('');
  useEffect(() => { setCart(initialCard); }, []);
  useEffect(() => { updateCard(cart); }, [cart]);
  const contxt1 = {
    userName, setUserName, nomeProfile, setNomeProfile, emailProfile, setEmailProfile,
  };
  const contxt2 = {
    cart, setCart, orderDetails, setOrderDetails, globalData, setGlobalData,
  };
  const contxt3 = { alertCompraFinalizada, setAlertCompraFinalizada };
  Object.assign(contxt1, contxt2, contxt3);
  return <AppContext.Provider value={ contxt1 }>{ children }</AppContext.Provider>;
}

export default Provider;

Provider.propTypes = {
  children: PropTypes.element.isRequired,
};

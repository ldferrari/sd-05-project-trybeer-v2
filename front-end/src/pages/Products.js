import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import TryBeerContext from '../context/TryBeerContext';
import Header from '../components/Header';
import { getAllProducts } from '../services/ApiTrybeer';
import ProductsList from '../components/ProductsList';
import CheckoutButton from '../components/CheckoutButton';

const userData = JSON.parse(localStorage.getItem('user'));
const token = userData && userData.token;
const totalReais = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

const Products = () => {
  const { setProductList, total } = useContext(TryBeerContext);

  useEffect(() => {
    getAllProducts(token).then((products) => setProductList(products))
      .catch((err) => err);
  }, [setProductList, token]);

  if (!token) return <Redirect to="/login" />;
  return (
    <section>
      <Header title="TryBeer" />
      <ProductsList />
      <CheckoutButton total={ total } />
      <span data-testid="checkout-bottom-btn-value">{totalReais.format(total)}</span>
    </section>
  );
};

export default Products;

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat

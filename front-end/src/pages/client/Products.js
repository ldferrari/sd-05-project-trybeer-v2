import React, { useState, useContext, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';

import ClientMenu from '../../components/client/ClientMenu';
import { getProducts } from '../../services/fetch';
import TrybeerContext from '../../context/TrybeerContext';
import EachProduct from '../../components/client/EachProduct';
import '../../css/client/products.css';

function cards(dataProducts) {
  return (
    <div className="productCards">
      {dataProducts.map((product, index) => (
        <EachProduct product={product} index={index} key={product} />
      ))}
    </div>
  );
}

function seeCart(totalPrice) {
  return (
    <Link to="/checkout">
      <button type="button" data-testid="checkout-bottom-btn" disabled={!totalPrice}>
        Ver Carrinho
        <p data-testid="checkout-bottom-btn-value">
          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
            totalPrice
          )}
        </p>
      </button>
    </Link>
  );
}

function Products() {
  const [dataProducts, setDataProducts] = useState([]);
  const [isLogged, setIsLogged] = useState(true);
  const { totalPrice } = useContext(TrybeerContext);
  useEffect(() => {
    getProducts().then((result) => setDataProducts(result));
    if (localStorage.getItem('user') === null) setIsLogged(false);
  }, []);
  return (
    <section>
      <ClientMenu title="TryBeer" />
      {cards(dataProducts)}
      {seeCart(totalPrice)}
      {!isLogged && <Redirect to="/login" />}
    </section>
  );
}

// currency https://developer.mozilla.org/en-US/docs/Web/Java/Reference/Global_Objects/Intl/NumberFormat/NumberFormat

export default Products;

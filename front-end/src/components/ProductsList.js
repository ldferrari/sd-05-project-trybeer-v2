import React, { useContext } from 'react';
import TryBeerContext from '../context/TryBeerContext';

import Card from './Card';

export default function ProductsList() {
  const { productsList } = useContext(TryBeerContext);

  return (
    <section className="products-list">
      {productsList
        && productsList.map((product, index) => (
          <Card index={ index } key={ product.id } product={ product } />
        ))}
    </section>
  );
}

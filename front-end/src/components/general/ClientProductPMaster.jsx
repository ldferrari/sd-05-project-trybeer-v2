import React from 'react';
import PropTypes from 'prop-types';
import ProdCard from '../client/ProductCard';

export default function ClientProductPMaster({ products }) {
  return (
    <div className="listProducts marginTop">
      {products.map((product, index) => (
        <ProdCard key={ product.id } index={ index } product={ product } />
      ))}
    </div>
  );
}

ClientProductPMaster.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
};

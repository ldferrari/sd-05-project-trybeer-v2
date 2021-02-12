import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { getProductById } from '../../services/fetch';

function itemQuantity(index, item) {
  return (<p data-testid={ `${index}-product-qtd` }>
    {item.quantity}
    {' '}
    -
    {' '}
          </p>);
}

export default function OrderCard({ item, index }) {
  const [productDetail, setProductDetail] = useState([]);
  useEffect(() => {
    getProductById(item.product_id).then((result) => setProductDetail(...result));
  }, [item.product_id]);
  const handlePrice = (price) => price.replace('.', ',');

  return (
    <div>
      {itemQuantity(index, item)}
      <p data-testid={ `${index}-product-name` }>{productDetail.name}</p>
      <p data-testid={ `${index}-product-total-value` }>
        R$
        {' '}
        {!productDetail.price ? null : handlePrice(productDetail.price)}
      </p>
    </div>
  );
}

OrderCard.propTypes = {
  item: PropTypes.node.isRequired,
  index: PropTypes.number.isRequired,
};

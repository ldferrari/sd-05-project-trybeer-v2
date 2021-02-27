import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';

import TryBeerContext from '../context/TryBeerContext';
import CardDetails from './CardDetails';

const zero = 0;
const totalPrice = parseFloat(localStorage.getItem('totalPrice'));

function Card(props) {
  const { product, index } = props;
  const { total, setTotal } = useContext(TryBeerContext);
  const [quantity, setQuantity] = useState(zero);
  const addData = { quantity, setQuantity, total, setTotal, product };
  const removeData = { quantity, setQuantity, total, setTotal, product };

  useEffect(() => { setTotal(totalPrice || zero); }, [setTotal]);

  return (
    <CardDetails
      index={ index }
      product={ product }
      quantity={ quantity }
      addData={ addData }
      removeData={ removeData }
    />
  );
}

export default Card;

Card.propTypes = {
  index: PropTypes.number.isRequired,
  product: PropTypes.shape({
    url_image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
  }).isRequired,
};

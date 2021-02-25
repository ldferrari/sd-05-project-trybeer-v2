import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import TrybeerContext from '../../context/TrybeerContext';
import { saveProductsMore, saveProductsLess } from '../../services/localStorage';

const initialCount = 0;

const renderImage = (index, product) => (<img
  data-testid={ `${index}-product-img` }
  src={ product.url_image }
  alt=""
  width="100"
  height="60"
/>);

const renderPrice = (index, product) => (
  <p data-testid={ `${index}-product-price` }>
    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
      product.price,
    )}
  </p>
);

const renderProductName = (product, index) => (
  <p key={ product.id } data-testid={ `${index}-product-name` }>
    {product.name}
  </p>
);

const buttonLess = (product, index, callback) => (
  <button
    type="button"
    key={ product.id }
    data-testid={ `${index}-product-minus` }
    onClick={ () => callback() }
  >
    -
  </button>
);

const buttonMore = (product, index, callback) => (
  <button
    type="button"
    key={ product.id }
    data-testid={ `${index}-product-plus` }
    onClick={ () => callback() }
  >
    +
  </button>
);

const renderAll = ({ index, product, callback1, callback2, countProduct }) => (
  <div className="eachCard">
    {renderPrice(index, product)}
    {' '}
    {renderImage(index, product)}
    {' '}
    {renderProductName(product, index)}
    <div className="controlQty">
      {' '}
      {buttonLess(product, index, callback1)}
      <p data-testid={ `${index}-product-qtd` } id={ `${index}-price` }>
        {countProduct}
      </p>
      {' '}
      {buttonMore(product, index, callback2)}
    </div>
  </div>
);

function EachProduct(props) {
  const { product, index } = props;
  const [countProduct, setCountProduct] = useState(initialCount);
  const { totalPrice, setTotalPrice } = useContext(TrybeerContext);
  const oneLess = async () => {
    if (countProduct > initialCount) {
      setCountProduct(countProduct - 1);
      setTotalPrice(totalPrice - product.price);
      saveProductsLess(product);
      setTotalPrice(totalPrice - Number(product.price));
    }
  };
  const oneMore = async () => {
    setCountProduct(countProduct + 1);
    setTotalPrice(totalPrice + Number(product.price));
    saveProductsMore(product);
    localStorage.setItem('totalPrice', totalPrice + Number(product.price));
  };
  return (
    <div>
      {renderAll({
        index,
        product,
        callback1: oneLess,
        callback2: oneMore,
        countProduct,
      })}
    </div>
  );
}

EachProduct.propTypes = {
  product: PropTypes.node.isRequired,
  index: PropTypes.number.isRequired,
};

export default EachProduct;

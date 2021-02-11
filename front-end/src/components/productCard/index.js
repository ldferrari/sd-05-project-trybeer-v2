import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../../context/AppContext';
import './index.css';

function minusOneFunction(exists, setCart, cart, product) {
  return () => {
    const zero = 0;
    const newProduct = (e) => ({
      ...e,
      quantity: e.quantity <= zero ? zero : e.quantity - 1,
    });
    if (exists) {
      setCart(cart.map((e) => (e.id === product.id ? newProduct(e) : e)));
    }
    return null;
  };
}
function plusOneFunction(exists, setCart, cart, product) {
  return () => {
    const um = 1;
    if (exists) {
      return setCart(cart
        .map((e) => (e.id === product.id ? { ...e, quantity: e.quantity + 1 } : e)));
    }
    return setCart([
      ...cart,
      {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: um,
      },
    ]);
  };
}
function ImageProduct(product) {
  return (
    <img
      src={ product.url_image }
      alt={ product.name }
      data-testid={ `${product.id - 1}-product-img` }
    />
  );
}
function ProductPrice(product) {
  return (
    <h4 data-testid={ `${product.id - 1}-product-price` }>
      { `R$ ${product.price.toString().replace('.', ',')}` }
    </h4>
  );
}
function ButtonMinus(minusOne, product) {
  return (
    <button
      type="button"
      className="maisOuMenos"
      data-testid={ `${product.id - 1}-product-minus` }
      onClick={ () => minusOne() }
    >
      -
    </button>
  );
}
function ButtonPlus(plusOne, product) {
  return (
    <button
      type="button"
      className="maisOuMenos"
      data-testid={ `${product.id - 1}-product-plus` }
      onClick={ () => plusOne() }
    >
      +
    </button>
  );
}

function ControlQuantity(exists, product, minusOne, plusOne) {
  const zero = 0;
  return (
    <div className="cardBottom">
      {ButtonMinus(minusOne, product)}
      <p data-testid={ `${product.id - 1}-product-qtd` }>
        {exists ? exists.quantity : zero}
      </p>
      {ButtonPlus(plusOne, product)}
    </div>
  );
}
const Card = (props) => {
  const { cart, setCart } = useContext(AppContext);
  const { product } = props;
  const exists = cart.find((produto) => produto.id === product.id);
  const minusOne = minusOneFunction(exists, setCart, cart, product);
  const plusOne = plusOneFunction(exists, setCart, cart, product);
  return (
    <div className="card" key={ product.name }>
      {ImageProduct(product)}
      <p data-testid={ `${product.id - 1}-product-name` }>{product.name}</p>
      {ProductPrice(product)}
      {ControlQuantity(exists, product, minusOne, plusOne)}
    </div>
  );
};

export default Card;

Card.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.string,
    url_image: PropTypes.string,
  }).isRequired,
};

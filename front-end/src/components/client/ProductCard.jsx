import React from 'react';
import PropTypes from 'prop-types';
import QuantityButton from './QuantityButton';
import ProdutCardImage from '../general/ProdutCardImage';
import ProdutCardName from '../general/ProdutCardName';

const ProdCard = (props) => {
  const { product, index } = props;
  return (
    <div key={ product.id } className="card-body">
      <ProdutCardImage product={ product } index={ index } />
      <ProdutCardName product={ product } index={ index } />
      <div data-testid={ `${index}-product-price` } className="cart-price">
        <div>
          { `R$ ${product.price.toString().replace('.', ',')}` }
        </div>
      </div>
      <QuantityButton
        index={ index }
        id={ product.id }
        price={ product.price }
        name={ product.name }
      />
    </div>
  );
};

ProdCard.propTypes = {
  product: PropTypes.arrayOf(PropTypes.object).isRequired,
  index: PropTypes.string.isRequired,
};

export default ProdCard;

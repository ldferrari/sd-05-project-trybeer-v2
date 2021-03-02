import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Helpers from '../Helper';

const ONE = 1;

function ProductCard({ product, onRefresh }) {
  const { id, name, price, url_image: urlImage } = product;

  const [quantity, setQuantity] = useState(
    Helpers.getProductFromCartById(id) ? (
      Helpers.getProductFromCartById(id).quantity
    ) : (
      undefined
    ),
  );

  return (
    <div className="card padding-zero blue-mid-bg margin-small">
      <div className="card-content padding-8px white-text">
        <div className="card-image">
          <img
            className="responsive-img"
            data-testid={ `${id - ONE}-product-img` }
            // src={ourLogo}
            src={ urlImage } // usar esta quando tiver as imagens vindo do back
            alt={ name }
          />
        </div>

        <div className="card-title" data-testid={ `${id - ONE}-product-name` }>
          {name}
        </div>

        <h6 className="margin-bot" data-testid={ `${id - ONE}-product-price` }>
          {`R$ ${Helpers.transformPrice(price)}`}
        </h6>

        <div className="quantity-and-btn">
          <div className="card-quantity">
            <h6 data-testid={ `${id - ONE}-product-qtd` }>{quantity || '0'}</h6>
            <div className="quantity" />
          </div>

          <div className="qty-btns">
            <button
              className="waves-effect waves-light btn-flat  yellow-main-bg white-mid-cl"
              type="button"
              data-testid={ `${id - ONE}-product-minus` }
              onClick={ () => {
                setQuantity(Helpers.setProductToCart(product, MINUSONE));
                onRefresh();
              } }
            >
              -
            </button>

            <button
              className="waves-effect waves-teal btn-flat yellow-main-bg white-mid-cl"
              type="button"
              data-testid={ `${id - ONE}-product-plus` }
              onClick={ () => {
                setQuantity(Helpers.setProductToCart(product, ONE));
                onRefresh();
              } }
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  onRefresh: PropTypes.func.isRequired,
  product: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.number,
    url_image: PropTypes.string,
  }).isRequired,
};

export default ProductCard;

import React from 'react';
import PropTypes from 'prop-types';

export default function ProdutCardImage(props) {
  const { product, index } = props;
  return (
    <div>
      <div className="divImage">
        <img
          height="70px"
          src={ product.url_image }
          data-testid={ `${index}-product-img` }
          className="card-image"
          alt={ product.name }
        />
      </div>
    </div>
  );
}

ProdutCardImage.propTypes = {
  product: PropTypes.arrayOf(PropTypes.object).isRequired,
  index: PropTypes.string.isRequired,
};

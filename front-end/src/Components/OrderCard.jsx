import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

const OrderCard = ({
  ordered: { id, sale_date: saleDate, status, total_price: totalPrice },
  index,
}) => {
  const priceFormated = parseFloat(totalPrice).toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL',
  });

  const dataFormated = new Date(saleDate).toLocaleDateString('pt-br', {
    day: '2-digit',
    month: '2-digit',
    hour: 'numeric',
    minute: 'numeric',
  });

  return (
    <div>
      <Link to={ `/orders/${id}` }>
        <div
          className="container-list blue-mid-bg white-text card horizontal space-between"
          data-testid={ `${index}-order-card-container` }
          >
          <p>Status: {status}</p>
          <div>
            <span className="elements" data-testid={ `${index}-order-number` }>
              Pedido
              {' '}
              {id}
            </span>
          </div>
          <div>
            <span className="elements" data-testid={ `${index}-order-date` }>
              {dataFormated}
            </span>
          </div>
          <div>
            <span
              className="elements"
              data-testid={ `${index}-order-total-value` }
            >
              {priceFormated}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

OrderCard.propTypes = {
  ordered: PropTypes.shape(Object).isRequired,
  index: PropTypes.number.isRequired,
};

export default OrderCard;

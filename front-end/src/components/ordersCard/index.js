import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
// import AppContext from '../../context/AppContext';
import './index.css';
import { Link } from 'react-router-dom';
import AppContext from '../../context/AppContext';

function OrderCardTitle(index, id) {
  return (
    <p data-testid={ `${index}-order-number` } className="orderCardTitle">
      {`Pedido ${id}`}
    </p>
  );
}
function OrderCardDate(index, saleDate) {
  return <p data-testid={ `${index}-order-date` }>{saleDate}</p>;
}
function OrderCardTotalValue(index, order) {
  return (
    <p data-testid={ `${index}-order-total-value` }>
      { `R$ ${order.total_price.toString().replace('.', ',')}` }
    </p>
  );
}

function OrderCardFinalCard(id, index, saleDate, order) {
  return (
    <div className="oCard">
      <Link
        to={ `/orders/${id}` }
        className="cardz orderLink"
        key={ id }
        data-testid={ `${index}-order-card-container"` }
      >
        {OrderCardTitle(index, id)}
        {OrderCardDate(index, saleDate)}
        {OrderCardTotalValue(index, order)}
      </Link>
    </div>
  );
}
const OrderCard = (props) => {
  const { order, index } = props;
  const { id, sale_date: saleDate } = order;
  const { setGlobalData } = useContext(AppContext);
  useEffect(() => {
    setGlobalData((state) => ({ ...state, [id]: saleDate }));
  }, [id, saleDate, setGlobalData]);
  return OrderCardFinalCard(id, index, saleDate, order);
};

export default OrderCard;

OrderCard.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number,
    sale_date: PropTypes.string,
    total_price: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

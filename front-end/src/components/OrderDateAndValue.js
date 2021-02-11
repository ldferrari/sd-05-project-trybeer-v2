import React from 'react';
import PropTypes from 'prop-types';

export default function OrderDateAndValue(props) {
  const { total, date } = props;

  return (
    <section>
      <p data-testid="order-total-value">
        {`${new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(total)}`}
      </p>
      <p data-testid="order-date">
        {`${new Date(date).toLocaleDateString('pt-br', {
          day: '2-digit',
          month: '2-digit',
        })}`}
      </p>
    </section>
  );
}

OrderDateAndValue.propTypes = {
  total: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
};

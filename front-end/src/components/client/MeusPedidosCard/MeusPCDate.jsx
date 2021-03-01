import React from 'react';
import PropTypes from 'prop-types';
import dateFormat from 'dateformat';

export default function MeusPCDate(props) {
  const { index, order } = props;
  return (
    <div data-testid={ `${index}-order-date` }>
      { dateFormat(order.sale_date, 'dd/mm') }
    </div>
  );
}

MeusPCDate.propTypes = {
  order: PropTypes.arrayOf(PropTypes.object).isRequired,
  index: PropTypes.number.isRequired,
};

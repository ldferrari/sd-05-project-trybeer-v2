import React from 'react';
import PropTypes from 'prop-types';

export default function MeusPCStatus(props) {
  const { index, order } = props;
  return (
    <div data-testid={ `${index}-order-status` }>
      { order.status }
    </div>
  );
}

MeusPCStatus.propTypes = {
  order: PropTypes.arrayOf(PropTypes.object).isRequired,
  index: PropTypes.number.isRequired,
};

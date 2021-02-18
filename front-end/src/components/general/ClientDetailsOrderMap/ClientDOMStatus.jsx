import React from 'react';
import PropTypes from 'prop-types';

export default function ClientDOMapStatus(props) {
  const { index, status } = props;
  return (
    <div>
      <span data-testid={ `${index}-product-name` }>
        { status }
      </span>
    </div>
  );
}

ClientDOMapStatus.propTypes = {
  status: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

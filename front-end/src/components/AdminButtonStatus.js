import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import fetchAdminOrders from '../services/ApiTrybeer';
import TryBeerContext from '../context/TryBeerContext';

export default function ButtonStatus({ id }) {
  const { status, setStatus } = useContext(TryBeerContext);

  if (!status || status === 'Entregue') return <div />;

  return (
    <span>
      <button
        type="button"
        data-testid="mark-as-delivered-btn"
        onClick={() => fetchAdminOrders(id).then(setStatus('Entregue'))}
      >
        Marcar como entregue
      </button>
      <button
        type="button"
        data-testid="mark-as-prepared-btn"
        onClick={() => fetchAdminOrders(id).then(setStatus('Preparando'))}
      >
        Preparar pedido
      </button>
    </span>
  );
}

ButtonStatus.propTypes = {
  id: PropTypes.number.isRequired,
};

import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { closeSale, changeSale } from '../../services/fetch';
import TrybeerContext from '../../context/TrybeerContext';

export default function BtnStatus({ id }) {
  const { status, setStatus } = useContext(TrybeerContext);

  if (!status || status === 'Entregue') return <div />;

  return (
    <div>
      <button
        type="button"
        data-testid="mark-as-prepared-btn"
        onClick={ () => changeSale(id).then(setStatus('Preparando')) }
      >
        Preparar pedido
      </button>
      <button
        type="button"
        data-testid="mark-as-delivered-btn"
        onClick={ () => closeSale(id).then(setStatus('Entregue')) }
      >
        Marcar como entregue
      </button>
    </div>
  );
}

BtnStatus.propTypes = {
  id: PropTypes.number.isRequired,
};

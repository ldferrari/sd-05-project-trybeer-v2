import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import MeusPCId from './MeusPedidosCard/MeusPCId';
import MeusPCDate from './MeusPedidosCard/MeusPCDate';
import MeusPCPrice from './MeusPedidosCard/MeusPCPrice';
import MeusPCStatus from './MeusPedidosCard/MeusPCStatus';

export default function MeusPedidosCard(props) {
  const { pedidos } = props;
  return (
    <div className="bodyMeusPedidos">
      {pedidos.map((order, index) => (
        <Link to={ `/orders/${order.id}` } key={ order.id } className="linkMeusPedidos">
          <div data-testid={ `${index}-order-card-container` } className="cardConteiner">
            <MeusPCId index={ index } order={ order } />
            <MeusPCDate index={ index } order={ order } />
            <MeusPCPrice index={ index } order={ order } />
            <MeusPCStatus index={ index } order={ order } />
          </div>
        </Link>
      ))}
    </div>
  );
}

MeusPedidosCard.propTypes = {
  pedidos: PropTypes.arrayOf(PropTypes.object).isRequired,
};

import React from 'react';
import PropTypes from 'prop-types';
import getSaleById from '../../../services/admin/getSaleById';
import updateSalesStatus from '../../../services/admin/updateSalesStatus';

const handleClick = async (id, setSaleDetails) => {
  updateSalesStatus(id, 'Entregue')
    .then(() => getSaleById(id))
    .then((response) => setSaleDetails(response));
};

export default function AdminSaleDetailsButton(props) {
  const { id, saleDetails, setSaleDetails } = props;
  return (
    <div>
      {saleDetails && (saleDetails.status === 'Pendente'
        || saleDetails.status === 'Preparando' ? (
          <button
            data-testid="mark-as-delivered-btn"
            className="adminDetailsButton"
            type="button"
            onClick={ () => handleClick(id, setSaleDetails) }
          >
            Marcar como entregue
          </button>
        ) : null)}
    </div>
  );
}

AdminSaleDetailsButton.propTypes = {
  id: PropTypes.string,
  saleDetails: PropTypes.arrayOf(PropTypes.object).isRequired,
  setSaleDetails: PropTypes.arrayOf(PropTypes.object).isRequired,
};

AdminSaleDetailsButton.defaultProps = {
  id: false,
};

import React from 'react';
import PropTypes from 'prop-types';
import getSaleById from '../../../services/admin/getSaleById';
import updateSalesStatus from '../../../services/admin/updateSalesStatus';

const handleClick = async (id, setSaleDetails) => {
  updateSalesStatus(id, 'Preparando')
    .then(() => getSaleById(id))
    .then((response) => setSaleDetails(response));
};

export default function AdminSaleDetailsPrepareButton(props) {
  const { id, saleDetails, setSaleDetails } = props;
  return (
    <div>
      {saleDetails && ((saleDetails.status === 'Pendente') ? (
        <button
          data-testid="mark-as-prepared-btn"
          className="adminDetailsButton"
          type="button"
          onClick={ () => handleClick(id, setSaleDetails) }
        >
          Preparar pedido
        </button>
      ) : null)}
    </div>
  );
}

AdminSaleDetailsPrepareButton.propTypes = {
  id: PropTypes.string,
  saleDetails: PropTypes.arrayOf(PropTypes.object).isRequired,
  setSaleDetails: PropTypes.arrayOf(PropTypes.object).isRequired,
};

AdminSaleDetailsPrepareButton.defaultProps = {
  id: false,
};

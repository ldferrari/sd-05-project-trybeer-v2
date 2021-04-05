import React from 'react';
import PropTypes from 'prop-types';
import AdminSaleDetailsStatus from './adminSaleDetailMaster/AdminSaleDetailsStatus';
import AdminSaleDetailsMap from './adminSaleDetailMaster/AdminSaleDetailsMap';
import AdminSaleDetailsPrice from './adminSaleDetailMaster/AdminSaleDetailsPrice';
import AdminSaleDetailsButton from './adminSaleDetailMaster/AdminSaleDetailsButton';
import PrepareButton from './adminSaleDetailMaster/AdminSaleDetailsPrepareButton';

export default function AdminSaleDetailMaster(props) {
  const { id, saleDetails, setSaleDetails } = props;
  return (
    <div className="adminDetailsBody">
      <AdminSaleDetailsStatus saleDetails={ saleDetails } />
      <AdminSaleDetailsMap saleDetails={ saleDetails } />
      <AdminSaleDetailsPrice saleDetails={ saleDetails } />
      <AdminSaleDetailsButton
        id={ id }
        saleDetails={ saleDetails }
        setSaleDetails={ setSaleDetails }
      />
      <PrepareButton
        id={ id }
        saleDetails={ saleDetails }
        setSaleDetails={ setSaleDetails }
      />
    </div>
  );
}

AdminSaleDetailMaster.propTypes = {
  id: PropTypes.string,
  saleDetails: PropTypes.arrayOf(PropTypes.object).isRequired,
  setSaleDetails: PropTypes.arrayOf(PropTypes.object).isRequired,
};

AdminSaleDetailMaster.defaultProps = {
  id: false,
};

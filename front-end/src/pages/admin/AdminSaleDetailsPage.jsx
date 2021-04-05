import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import MenuAdm from '../../components/admin/MenuAdm';
import getSaleById from '../../services/admin/getSaleById';
import AdminSaleDetailMaster from '../../components/general/AdminSaleDetailMaster';
import '../../css/admin/adminSaleDetailsPage.css';

export default function AdminSaleDetailsPage(props) {
  const token = localStorage.getItem('token') || null;
  const [saleDetails, setSaleDetails] = useState('');
  const { id } = props;
  useEffect(() => {
    getSaleById(id).then((response) => setSaleDetails(response));
  }, [id]);
  if (!token) return <Redirect to="/login" />;
  return (
    <div>
      <MenuAdm />
      <AdminSaleDetailMaster
        id={ id }
        saleDetails={ saleDetails }
        setSaleDetails={ setSaleDetails }
      />
    </div>
  );
}

AdminSaleDetailsPage.propTypes = {
  id: PropTypes.string,
};

AdminSaleDetailsPage.defaultProps = {
  id: false,
};

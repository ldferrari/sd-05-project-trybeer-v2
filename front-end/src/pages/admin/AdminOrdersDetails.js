import React, { useEffect, useState, useContext } from 'react';
import { getSaleDetails } from '../../services/fetch';
import AdminProductsList from '../../components/admin/AdminProductsList';
import AdminMenu from '../../components/admin/AdminMenu';
import OrderStatus from '../../components/admin/OrderStatus';
import TrybeerContext from '../../context/TrybeerContext';
import BtnStatus from '../../components/admin/BtnChangeStatus';

function renderDetails(saleNumber, saleDetails, totalPrice) {
  return (
    <div>
      <AdminMenu />
      <div>
        {orderNumber(saleNumber)}
        <OrderStatus id={saleNumber} />
      </div>
      <div>
        {details(saleDetails)}
        {total(totalPrice)}
      </div>
      <BtnStatus id={saleNumber} />
    </div>
  );
}
function orderNumber(saleNumber) {
  return (
    <span id="sale-id" data-testid="order-number">
      {`Pedido ${saleNumber}`}
    </span>
  );
}
function details(saleDetails) {
  return (
    <ul>
      {saleDetails.map((sale, index) => (
        <AdminProductsList key={sale.id} sale={sale} index={index} />
      ))}
    </ul>
  );
}

function total(totalPrice) {
  const two = 2;
  return (
    <span data-testid="order-total-value">
      {`Total: R$ ${totalPrice.toFixed(two).replace('.', ',')}`}
    </span>
  );
}

function AdminOrdersDetails() {
  const [saleNumber, setSaleNumber] = useState();
  const [saleDetails, setSaleDetails] = useState([]);
  const { totalPrice } = useContext(TrybeerContext);

  useEffect(() => {
    const arrPath = window.location.pathname.split('/');
    const id = arrPath[3];
    getSaleDetails(id).then(
      (response) => setSaleNumber(response[0].sale_id) || setSaleDetails(response)
    );
  }, []);

  if (!saleNumber) return <div>Carregando...</div>;
  return <div>{renderDetails(saleNumber, saleDetails, totalPrice)}</div>;
}

export default AdminOrdersDetails;

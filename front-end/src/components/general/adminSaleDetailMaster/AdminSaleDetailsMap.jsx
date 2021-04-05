import React from 'react';
import PropTypes from 'prop-types';
import AdminSDMapQtd from '../adminSaleDetailsMap/adminSDMapQtd';
import AdminSDMapName from '../adminSaleDetailsMap/adminSDMapName';
import AdminSDMapTotal from '../adminSaleDetailsMap/adminSDMapTotal';

export default function AdminSaleDetailsMap(props) {
  const { saleDetails } = props;
  return (
    <div>
      {saleDetails && (saleDetails.products.map((product, index) => (
        <div key="eslint" className="adminDetailsContainer">
          <AdminSDMapQtd product={ product } index={ index } />
          <AdminSDMapName product={ product } index={ index } />
          <AdminSDMapTotal product={ product } index={ index } />
          <span data-testid={ `${index}-order-unit-price` } className="adminDetailsPrice">
            {`(R$ ${product.price.toString().replace('.', ',')})`}
          </span>
        </div>
      )))}
    </div>
  );
}

AdminSaleDetailsMap.propTypes = {
  saleDetails: PropTypes.arrayOf(PropTypes.object).isRequired,
};

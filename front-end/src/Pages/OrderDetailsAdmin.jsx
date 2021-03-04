import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import Restrict from '../Components/Restrict';
import helper from '../Helper';
import AdminSideBar from '../Components/AdminSideBar';

const MOCK = {
  total_price: 0,
  delivery_address: 'endereço',
  delivery_number: 'número',
  sale_date: '2021-02-18T18:22:43.000Z',
  status: 'Em preparo',
  product: [
    {
      name: 'Produto',
      price: 0,
      url_image: 'http://localhost:3001/images/Heineken 600ml.jpg',
      sales_product: {
        quantity: 4,
      },
    },
  ],
};

const OrderDetailsAdmin = ({
  match: {
    params: { id },
  },
}) => {
  const [status, setStatus] = useState('none');
  const [order, setOrder] = useState(MOCK);

  useEffect(() => {
    helper.fetch.salesById(id).then((data) => {
      setOrder(data);
      setStatus(data.status)
    }) 
  }, [id]);

  const total = helper.transformPrice(order.total_price);

  const Deliver = () => {
    // marcar como pendente na store e no banco
    helper.fetch.updateDeliveryStatus(id, 'Entregue');
    setStatus('Entregue')
    // ---
  };
  const Prepare = () => {
    // marcar como pendente na store e no banco
    helper.fetch.updateDeliveryStatus(id, 'Em preparo');
    setStatus('Em preparo')
    // ---
  };

  console.log(status)
  if (status === 'none') return <p>Loading...</p>
  return (
    <Restrict>
      <div>
        <AdminSideBar />
        <div className="responsive-list">
          <div
            className="blue-mid-bg white-text card"
            style={ { margin: ' 16px 16px' } }
          >
            <h6 data-testid="order-number">
              Pedido
              {id}
            </h6>
            <div
              data-testid="order-status"
              style={ { color: status === 'Entregue' ? '#FFB703' : ' #023047' } }
            >
              <h6>{status === 'Em preparo' ? 'Preparando' : status}</h6>
            </div>
          </div>
          <div className="horizontal-center">
            <h6 data-testid="order-total-value">
              Total: R$
              {total}
            </h6>
            <hr style={ { border: '1px dashed' } } />
            <ul>
              {order.product.map((product, index) => {
                const totalValueByProduct = helper.transformPrice(
                  product.price * product.sales_product.quantity,
                );

                return (
                  <li key={ product.name }>
                    <span data-testid={ `${index}-product-qtd` }>
                      {product.sales_product.quantity}
                      {' '}
                      -
                      {' '}
                    </span>
                    <span data-testid={ `${index}-product-name` }>
                      {product.name}
                      {' '}
                    </span>
                    <span data-testid="0-order-unit-price">
                      (R$
                      {' '}
                      {helper.transformPrice(product.price)}
                      )
                    </span>
                    <span>{'   '}</span>
                    <span>-</span>
                    <span>{'   '}</span>
                    <span data-testid={ `${index}-product-total-value` }>
                      R$
                      {' '}
                      {totalValueByProduct}
                    </span>
                  </li>
                );
              })}
            </ul>
            <div className="horizontal-center">
              {status === 'Entregue' ? <p>Bom apetite</p> : status === 'Em preparo' ? (
                <div>
                  <button
                    // style={{ textOverflow: 'ellipsis'}}
                    className="btn orange-bg blue-mid-cl"
                    data-testid="mark-as-delivered-btn"
                    type="button"
                    onClick={ () => Deliver() }
                    data-testid="mark-as-delivered-btn"
                  >
                    Marcar como entregue
                  </button>
                </div>
              ) : (
                <div>
                  <button
                  // style={{ textOverflow: 'ellipsis'}}
                  className="btn orange-bg blue-mid-cl"
                  data-testid="mark-as-delivered-btn"
                  type="button"
                  onClick={ () => Deliver() }
                  data-testid="mark-as-delivered-btn"
                >
                  Marcar como entregue
                </button>
                <button
                // style={{ textOverflow: 'ellipsis'}}
                className="btn orange-bg blue-mid-cl"
                data-testid="mark-as-delivered-btn"
                type="button"
                onClick={ () => Prepare() }
                data-testid="mark-as-prepared-btn"
              >
                Preparar pedido
              </button>
                </div>  
              ) }
            </div>
          </div>
        </div>
      </div>
    </Restrict>
  );
};

OrderDetailsAdmin.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default OrderDetailsAdmin;

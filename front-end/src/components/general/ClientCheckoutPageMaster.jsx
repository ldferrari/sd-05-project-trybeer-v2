import React, { useContext } from 'react';
import ClientCPMQtdInput from './clientCheckoutPageMaster/ClientCPMQtdInput';
import ClientCPMPrice from './clientCheckoutPageMaster/ClientCPMPrice';
import ClientCPMButtonX from './clientCheckoutPageMaster/ClientCPMButtonX';
import ClientCPMContainer from './clientCheckoutPageMaster/ClientCPMContainer';
import { ClientContext } from '../../context/client/ClientProvider';

const zero = 0;

export default function ClientCheckoutPageMaster() {
  const { cartItens } = useContext(ClientContext);
  return (
    <div>
      { (cartItens.length === zero) && <div>Não há produtos no carrinho</div> }
      { (cartItens.length !== zero) && cartItens.map((product, index) => (
        <div key={ product.id } className="checkoutProduct">
          <div className="checkoutContainer">
            <ClientCPMQtdInput index={ index } product={ product } />
            <ClientCPMPrice index={ index } product={ product } />
          </div>
          <ClientCPMButtonX index={ index } />
        </div>
      )) }
      <ClientCPMContainer />
    </div>
  );
}

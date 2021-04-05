import React, { useContext } from 'react';
import { ClientContext } from '../../../../context/client/ClientProvider';

const two = 2;

export default function ClientCPMQtdTotalPrice() {
  const { cart } = useContext(ClientContext);
  return (
    <div className="checkoutTotal">
      <span
        data-testid="order-total-value"
      >
        {`Total: R$ ${Number(cart).toFixed(two).replace('.', ',')}`}
      </span>
    </div>
  );
}

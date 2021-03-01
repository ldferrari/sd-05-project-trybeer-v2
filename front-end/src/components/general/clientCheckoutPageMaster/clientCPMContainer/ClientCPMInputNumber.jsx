import React, { useContext } from 'react';
import { ClientContext } from '../../../../context/client/ClientProvider';

export default function ClientCPMQtdInputNumber() {
  const { setStreetNumber } = useContext(ClientContext);
  return (
    <div>
      <label htmlFor="number" className="checkoutLabel">
        Número da casa
        <input
          data-testid="checkout-house-number-input"
          className="checkoutInputNumero"
          id="number"
          type="number"
          onChange={ (event) => setStreetNumber(event.target.value) }
        />
      </label>
    </div>
  );
}

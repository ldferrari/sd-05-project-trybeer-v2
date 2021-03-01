import React, { useContext } from 'react';
import { ClientContext } from '../../../../context/client/ClientProvider';

export default function ClientCPMQtdInputRua() {
  const { setStreet } = useContext(ClientContext);
  return (
    <div>
      <label htmlFor="street" className="checkoutLabel">
        Rua
        <input
          data-testid="checkout-street-input"
          className="checkoutInputRua"
          id="street"
          type="text"
          onChange={ (event) => setStreet(event.target.value) }
        />
      </label>
    </div>
  );
}

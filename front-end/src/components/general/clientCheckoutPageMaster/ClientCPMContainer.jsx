import React, { useContext } from 'react';
import { ClientContext } from '../../../context/client/ClientProvider';
import ClientCPMTotalPrice from './clientCPMContainer/ClientCPMTotalPrice';
import ClientCPMInputRua from './clientCPMContainer/ClientCPMInputRua';
import ClientCPMInputNumber from './clientCPMContainer/ClientCPMInputNumber';
import ClientCPMButton from './clientCPMContainer/ClientCPMButton';

export default function ClientCPMContainer() {
  const { purchaseDone } = useContext(ClientContext);
  return (
    <div>
      <ClientCPMTotalPrice />
      <div className="checkoutLabels">
        <ClientCPMInputRua />
        <ClientCPMInputNumber />
      </div>
      <ClientCPMButton />
      { purchaseDone && (
        <div className="checkoutSucesso">
          Compra realizada com sucesso!
        </div>
      ) }
    </div>
  );
}

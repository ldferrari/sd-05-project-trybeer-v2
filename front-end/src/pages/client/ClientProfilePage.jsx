import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Menu from '../../components/client/Menu';
import GeneralContext from '../../context/general/GeneralContext';
import '../../css/client/clientProfilePage.css';
import ClientProfileInputEmail from '../../components/general/ClientProfileInputEmail';
import ClientProfileInputName from '../../components/general/ClientProfileInputName';
import ClientProfileButton from '../../components/general/ClientProfileButton';

export default function ClientProfilePage() {
  const token = localStorage.getItem('token') || null;
  const user = JSON.parse(localStorage.getItem('user')) || null;
  const { apiSuccess } = useContext(GeneralContext);
  const [localName, setLocalName] = useState(user.name);
  const inpName = { localName, setLocalName, user };
  if (!token) return <Redirect to="/login" />;
  return (
    <div>
      <Menu title="Meu perfil" data-testid="top-title" />
      <div className="bodyProfile">
        <ClientProfileInputEmail user={ user } />
        <ClientProfileInputName inpName={ inpName } />
        <ClientProfileButton user={ user } localName={ localName } />
      </div>
      {apiSuccess && <div className="sucesso">Atualização concluída com sucesso</div>}
    </div>
  );
}

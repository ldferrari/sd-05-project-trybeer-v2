import React from 'react';
import { Redirect } from 'react-router-dom';
import MenuAdm from '../../components/admin/MenuAdm';
import '../../css/admin/adminProfilePage.css';
import AdminProfileEmail from '../../components/general/AdminProfileEmail';
import AdminProfileName from '../../components/general/AdminProfileName';

export default function ClientProfilePage() {
  const token = localStorage.getItem('token') || null;
  if (!token) return <Redirect to="/login" />;
  return (
    <div className="admProfileBody">
      <MenuAdm />
      <div className="admProfileTitle">Admin - Perfil</div>
      <div className="amdProfileLabels">
        <AdminProfileEmail />
        <AdminProfileName />
      </div>
    </div>
  );
}

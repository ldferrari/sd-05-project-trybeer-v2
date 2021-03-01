import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import GeneralContext from '../../../context/general/GeneralContext';

export default function LinkLogin() {
  const { setUserData, initialUser } = useContext(GeneralContext);
  return (
    <div>
      <Link
        to="/login"
        data-testid="side-menu-item-logout"
        className="buttonLateral"
        onClick={ () => {
          localStorage.setItem('token', '');
          setUserData({ initialUser });
        } }
      >
        Sair
      </Link>
    </div>
  );
}

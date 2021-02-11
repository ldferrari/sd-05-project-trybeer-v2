import React, { useState } from 'react';
import proptypes from 'prop-types';
import Sidebar from '../sidebar';
import logo from '../../images/uai2.png';

import './index.css';

function BurgerButton(setDisplay, display) {
  return (
    <button
      type="button"
      className="burguerBtn"
      data-testid="top-hamburguer"
      onClick={ () => { setDisplay(!display); } }
    >
      &#9776;
    </button>
  )
}

const Header = ({ children }) => {
  const [display, setDisplay] = useState(false);
  return (
    <header>
      <div className="header">
        {BurgerButton(setDisplay, display)}
        <h2 data-testid="top-title" className="title">{children}</h2>
        <img src={ logo } className="logoHeader" alt="logo" />
      </div>
      { display && <Sidebar /> }
    </header>
  );
};

export default Header;

Header.propTypes = {
  children: proptypes.string.isRequired,
};

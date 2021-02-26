import React from 'react';
import PropTypes from 'prop-types';
import Sidebar from './Sidebar';

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining

export default function Header(props) {
  const { title } = props;
  const userData = JSON.parse(localStorage.getItem('user'));
  const role = userData && userData.user && userData.user.role;

  return (
    <section>
      <header>
        <button data-testid="top-hamburguer" type="button">
          BURGER
        </button>
        <span data-testid="top-title">{title}</span>
      </header>
      <Sidebar role={ role } />
    </section>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

import React from 'react';
import PropTypes from 'prop-types';

export default function ProfileButton(props) {
  const { name, handleClick, data } = props;

  return (
    <section>
      <button
        type="submit"
        disabled={ !name }
        data-testid="profile-save-btn"
        onClick={ (event) => handleClick(event, data) }
      >
        Salvar
      </button>
    </section>
  );
}

ProfileButton.propTypes = {
  name: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  data: PropTypes.instanceOf(Object).isRequired,
};

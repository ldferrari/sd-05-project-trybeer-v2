import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import TryBeerContext from '../context/TryBeerContext';

export default function ProfileNameInput({ role }) {
  const { name, setName } = useContext(TryBeerContext);

  return (
    <section>
      <label htmlFor="name" data-testid="profile-name">
        {role === 'client' ? 'Nome' : 'Tryber Admin'}
        <input
          type="text"
          value={ name }
          data-testid="profile-name-input"
          onChange={ (event) => setName(event.target.value) }
          readOnly={ role === 'administrator' }
          placeholder={ name }
        />
      </label>
    </section>
  );
}

ProfileNameInput.propTypes = {
  role: PropTypes.string.isRequired,
};

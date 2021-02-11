import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import TryBeerContext from '../context/TryBeerContext';

export default function ProfileEmailInput({ role }) {
  const { email } = useContext(TryBeerContext);

  return (
    <section>
      <label htmlFor="email" data-testid="profile-email">
        {role === 'client' ? 'Email' : email}
        <input
          id="email"
          type="email"
          data-testid="profile-email-input"
          readOnly
          placeholder={ email }
        />
      </label>
    </section>
  );
}

ProfileEmailInput.propTypes = {
  role: PropTypes.string.isRequired,
};

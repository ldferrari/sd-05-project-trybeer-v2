import React from 'react';
import PropTypes from 'prop-types';

export default function ProfileEmailInput({ role, email }) {
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
  email: PropTypes.string.isRequired,
};

import React from 'react';
import PropTypes from 'prop-types';

export default function ClientProfileInputEmail({ user }) {
  return (
    <label htmlFor="email" className="labelProfile">
      Email
      <input
        data-testid="profile-email-input"
        className="inputProfile"
        type="text"
        id="email"
        name="email"
        value={ user.email }
        readOnly
      />
    </label>
  );
}

ClientProfileInputEmail.propTypes = {
  user: PropTypes.string.isRequired,
};

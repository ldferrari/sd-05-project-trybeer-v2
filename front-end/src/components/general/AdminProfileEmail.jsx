import React from 'react';

const user = JSON.parse(localStorage.getItem('user')) || null;

export default function AdminProfileEmail() {
  return (
    <div>
      <label htmlFor="email" className="admProfileLabel">
        Email
        <div
          data-testid="profile-email"
          className="admProfileLabelDate"
          id="email"
          readOnly
        >
          { user.email }
        </div>
      </label>
    </div>
  );
}

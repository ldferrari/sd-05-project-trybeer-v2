import React from 'react';

const user = JSON.parse(localStorage.getItem('user')) || null;

export default function AdminProfileName() {
  return (
    <div>
      <label htmlFor="name" className="admProfileLabel">
        Name
        <div
          data-testid="profile-name"
          className="admProfileLabelDate"
          id="name"
          readOnly
        >
          { user.name }
        </div>
      </label>
    </div>
  );
}

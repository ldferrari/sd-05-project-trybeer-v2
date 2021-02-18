import React from 'react';
import { Link } from 'react-router-dom';

export default function LoginButtonRegister() {
  return (
    <button
      type="button"
      data-testid="no-account-btn"
      className="semConta"
    >
      <Link to="/register" className="link">Ainda não tenho conta</Link>
    </button>
  );
}

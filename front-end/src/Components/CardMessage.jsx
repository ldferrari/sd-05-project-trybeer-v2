import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

const TEN = 10;

const containerStyle = {
  display: 'flex',
  width: '100%',
  alignItems: 'center',
};

const cardStyle = {
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  color: 'black',
};

const getTime = (date) => {
  const hh = date.getHours();
  const mm = date.getMinutes();
  return `${hh}:${mm >= TEN ? '' : '0'}${mm}`;
};

const ChatMessage = ({ buffer }) => {
  const [redirect, setRedirect] = useState(null);
  const date = new Date(buffer.createdAt);
  if (redirect) return <Redirect to={ redirect } />;
  return (
    <div
      style={ containerStyle }
      data-testid="new-transmission-line-btn"
      onClick={ () => {
        setRedirect(`/admin/chat/${buffer.from.id}`);
      } }
      onKeyDown={ (key) => {
        if (key === 'K') {
          setRedirect(`/admin/chat/${buffer.from.id}`);
        }
      } }
      role="link"
      tabIndex={ buffer.from.id }
    >
      <div className="card-panel lighten-3 z-depth-1" style={ cardStyle }>
        <div className="card-content">
          <span className="card-title" data-testid="profile-name">
            {buffer.from.email}
          </span>
          <p data-testid="last-message">
            Última mensagem às
            {getTime(date)}
          </p>
        </div>
      </div>
    </div>
  );
};

ChatMessage.propTypes = {
  buffer: PropTypes.shape({
    createdAt: PropTypes.string,
    from: PropTypes.shape({
      email: PropTypes.string,
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default ChatMessage;

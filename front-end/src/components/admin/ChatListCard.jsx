import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function ChatListCard(props) {
  const { nickname, timestamp } = props;
  return (
    <div className="containerChat">
      <Link to="/admin/chat" data-testid="containerChat" className="containerIn">
        <div data-testid="profile-name" className="divIn">{ nickname }</div>
        <div data-testid="last-message">{ `Última mensagem às ${timestamp}` }</div>
      </Link>
    </div>
  );
}

ChatListCard.propTypes = {
  nickname: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
};

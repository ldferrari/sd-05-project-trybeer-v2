import React from 'react';
import PropTypes from 'prop-types';

export default function LabelMenu(props) {
  const { title } = props;
  return (
    <div>
      <h1 className="topTitle" data-testid="top-title">
        {title}
      </h1>
    </div>
  );
}

LabelMenu.propTypes = {
  title: PropTypes.string.isRequired,
};

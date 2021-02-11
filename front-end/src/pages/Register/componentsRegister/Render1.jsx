import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import { Redirect } from 'react-router-dom';
import '../index.css';
import RenderName from './RenderName';
import RenderEmail from './RenderEmail';
import RenderPassword from './RenderPassword';
import RenderCheckbox from './RenderCheckbox';
import RenderButton from './RenderButton';

const Render1 = (param) => {
  const { emailUsed } = param;
  return (
    <form className="column-register">
      {RenderName(param)}
      {RenderEmail(param)}
      {RenderPassword(param)}
      <span className="email-alert">{emailUsed}</span>
      {RenderCheckbox(param)}
      {RenderButton(param)}
    </form>
  );
};

export default Render1;

Render1.propTypes = { param: PropTypes.instanceOf(Object).isRequired };

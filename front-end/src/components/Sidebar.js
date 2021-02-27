import React from 'react';
import PropTypes from 'prop-types';

import SidebarClient from './SidebarClient';
import SidebarAdmin from './SidebarAdmin';

export default function Sidebar({ role }) {
  return (
    <aside>
      { role === 'client' && <SidebarClient /> }
      { role === 'administrator' && <SidebarAdmin /> }
    </aside>
  );
}

Sidebar.propTypes = {
  role: PropTypes.string.isRequired,
};

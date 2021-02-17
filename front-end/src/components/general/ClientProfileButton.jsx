import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import updateUserNameAPI from '../../services/general/fetchUpdateUser';
import GeneralContext from '../../context/general/GeneralContext';

const handleClick = async (clickData) => {
  const { setUserData, setApiSuccess, setNameEqual, user, localName } = clickData;
  setUserData({
    ...user,
    name: localName,
  });
  localStorage.setItem(
    'user',
    JSON.stringify({ id: user.id, email: user.email, name: localName, role: user.role }),
  );
  const api = await updateUserNameAPI(user.id, {
    ...user,
    name: localName,
  });
  if (api.message === 'success') {
    setApiSuccess(true);
  }
  setNameEqual(true);
};

export default function ClientProfileButton({ user, localName }) {
  const { setUserData, nameEqual } = useContext(GeneralContext);
  const { setApiSuccess, setNameEqual } = useContext(GeneralContext);
  const clickData = { setUserData, setApiSuccess, setNameEqual, user, localName };
  return (
    <button
      data-testid="profile-save-btn"
      className="salvar"
      type="button"
      onClick={ () => handleClick(clickData) }
      disabled={ nameEqual }
    >
      Salvar
    </button>
  );
}

ClientProfileButton.propTypes = {
  user: PropTypes.string.isRequired,
  localName: PropTypes.string.isRequired,
};

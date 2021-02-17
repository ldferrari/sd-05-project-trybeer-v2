import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import updateUserNameAPI from '../../services/general/fetchUpdateUser';
import GeneralContext from '../../context/general/GeneralContext';

const handleClick = async (setUserData, setApiSuccess, user, localName) => {
  setUserData({
    ...user,
    name: localName,
  });
  localStorage.setItem(
    'user',
    JSON.stringify({ email: user.email, name: localName, role: user.role }),
  );
  const api = await updateUserNameAPI(user.id, {
    ...user,
    name: localName,
  });
  console.log(api);
  if (api.message === 'success') {
    setApiSuccess(true);
  }
};

export default function ClientProfileButton({ user, localName }) {
  const { setUserData, nameEqual, setApiSuccess } = useContext(GeneralContext);
  return (
    <button
      data-testid="profile-save-btn"
      className="salvar"
      type="button"
      onClick={ () => handleClick(setUserData, setApiSuccess, user, localName) }
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

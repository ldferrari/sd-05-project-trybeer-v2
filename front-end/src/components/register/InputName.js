import React, { useContext } from 'react';
import TrybeerContext from '../../context/TrybeerContext';
import RegisterContext from '../../context/RegisterContext';
import { checkName } from '../../services/checkUserData';
// import PropTypes from 'prop-types';

function InputName() {
  const { setName } = useContext(TrybeerContext);
  const { checkedName, setCheckedName } = useContext(RegisterContext);
  const handleNameChange = (e) => {
    setCheckedName(checkName(e.target.value));
    if (checkedName) {
      setName(e.target.value);
    }
  };
  return (
    <section>
      <div>Nome</div>
      <input data-testid="signup-name" type="text" onChange={ (e) => handleNameChange(e) } />
    </section>
  );
}

export default InputName;

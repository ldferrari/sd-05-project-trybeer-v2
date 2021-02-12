import React from 'react';

import { validateRegister } from '../services/validateRegister';
import Input from './Input';
import Input from '../components/Input';
import Button from '../components/Button';
import {
  iName,
  iPassword,
  iCheckbox,
  iEmail,
  bRegister,
} from '../components/data/registerData.json';

async function handleRegister(userToRegister, setDesignetedRoute, userEmail) {

  if (!validateRegister(userToRegister)) return setDesignetedRoute(undefined);

  const response = await registerUser(userToRegister);

  if (response.message) {
    const labelEmail = document.querySelector('#lblEmail');
    const alreadyExists = document.createElement('span');
    alreadyExists.innerHTML = 'E-mail already in database.';
    return labelEmail.appendChild(alreadyExists);
  }

  localStorage.setItem('role', response.role);
  localStorage.setItem('token', response.token);
  localStorage.setItem('email', userEmail);
  return response.role === 'client'
    ? setDesignetedRoute('/products')
    : setDesignetedRoute('/admin/orders');
}

const handleSubmit = (userData, e) => {
  e.preventDefault();
  return handleRegister()
};

const userData = {
  name: userName,
  email: userEmail,
  password,
  checkbox: seller,
};

const Form = (props) => {
  // const { userData } = props;
  // const registerContext = React.useContext(Context);
  const { userName, userEmail, seller, password } = useContext(
    Context
  );
  const [designatedRoute, setDesignetedRoute] = useState(undefined);
  return (
    <form id="register-form">
        <Input i={ iName } />
        <Input i={ iEmail } />
        <Input i={ iPassword } />
        <Input i={ iCheckbox } />
        <div className="buttons">
          <Button b={bRegister} disabled={!validateRegister(userData)} onClick={(e) => handleSubmit(userData, e)}/>
          <button type="button" className="btn-return">
            <Link to="/login">Voltar</Link>
          </button>
        </div>
      </form>
  )
};

export default Form;

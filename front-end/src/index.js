import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
/* import ContextProvider from './context/client/ClientProvider'; */
import App from './App';
/* import { AllProviders } from './context/general/GeneralProvider'; */
/* import GeneralProvider from './context/general/GeneralProvider';
import GeneralProvider1 from './context/general/GeneralProvider1';
import GeneralProvider2 from './context/general/GeneralProvider2'; */

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);

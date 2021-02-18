import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import RegisterPage from './pages/general/RegisterPage';
import ClientProductPage from './pages/client/ClientProductPage';
import LoginPage from './pages/general/LoginPage';
import AdminProfilePage from './pages/admin/AdminProfilePage';
import ClientMeusPedidos from './pages/client/ClientMeusPedidosPage';
import AdminOrderPage from './pages/admin/AdminOrderPage';
import ClientCheckoutPage from './pages/client/ClientCheckoutPage';
import ClientProfilePage from './pages/client/ClientProfilePage';
import './css/client/app.css';
import ClientDetailsOrderPage from './pages/client/ClientDetailsOrderPage';
import AdminSaleDetailsPage from './pages/admin/AdminSaleDetailsPage';
import ClientChatPage from './pages/client/ClientChatPage';
import AdminChatPage from './pages/admin/AdminChatPage';
import GeneralProvider from './context/general/GeneralProvider';
import GeneralProvider1 from './context/general/GeneralProvider1';
import GeneralProvider2 from './context/general/GeneralProvider2';
import ContextProvider from './context/client/ClientProvider';

function App() {
  return (
    <div className="App">
      <GeneralProvider2>
        <GeneralProvider1>
          <GeneralProvider>
            <ContextProvider>
              <Switch>
                <Route
                  path="/admin/orders/:id"
                  render={ (props) => {
                    const { id } = props.match.params;
                    return <AdminSaleDetailsPage id={ id } />;
                  } }
                />
                <Route path="/admin/orders" component={ AdminOrderPage } />
                <Route path="/admin/profile" component={ AdminProfilePage } />
                <Route path="/admin/chats" component={ AdminChatPage } />
                <Route path="/login" component={ LoginPage } />
                <Route path="/register" component={ RegisterPage } />
                <Route path="/products" component={ ClientProductPage } />
                <Route path="/profile" component={ ClientProfilePage } />
                <Route
                  path="/orders/:id"
                  render={ (props) => {
                    const { id } = props.match.params;
                    return <ClientDetailsOrderPage id={ id } />;
                  } }
                />
                <Route path="/orders" component={ ClientMeusPedidos } />
                <Route path="/checkout" component={ ClientCheckoutPage } />
                <Route path="/chat" component={ ClientChatPage } />
                <Route path="/" component={ () => <Redirect to="/login" /> } />
              </Switch>
            </ContextProvider>
          </GeneralProvider>
        </GeneralProvider1>
      </GeneralProvider2>
    </div>
  );
}

App.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }),
};

export default App;

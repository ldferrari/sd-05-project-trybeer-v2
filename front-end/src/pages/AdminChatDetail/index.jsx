import React from 'react';
import propTypes from 'prop-types';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import Home from './Home';

function App(props) {
  const theme = createMuiTheme({
    spacing: 4,
    palette: {
      primary: {
        main: '#9500ae',
      },
      secondary: {
        main: '#9500ae',
      },
    },
  });
  const { history } = props;
  const { match: { params: { email } } } = props;
  return (
    <ThemeProvider theme={ theme }>
      <Home history={ history } email={ email } />
    </ThemeProvider>
  );
}

export default App;

App.propTypes = {
  history: propTypes.instanceOf(Object).isRequired,
  match: propTypes.instanceOf(Object).isRequired,
};

import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import React from 'react';
import Home from './Home';

function App(props) {
  const theme = createMuiTheme({
    spacing: 4,
    palette: {
      primary: {
        main: '#9500ae',
      },
      secondary: {
        main: '#76ff03',
      },
    },
  });

  return (
    <ThemeProvider theme={ theme }>
      <Home history={props.history} />
    </ThemeProvider>
  );
}

export default App;

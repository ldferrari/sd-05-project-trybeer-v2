import React from 'react';
import Home from './Home';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';

function App() {
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

  return (
    <ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>
  );
}

export default App;

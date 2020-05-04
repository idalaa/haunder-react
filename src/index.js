import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// Color theme:
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import {deepOrange} from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: deepOrange[900],
      light: deepOrange[500],
    },
    secondary: {
      main: '#ffd822',
      light: '#ffeb22',
      dark: '#ffa122',
    },
    /* default: {
        main: red[500],
      }, */
  },
});

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
      <App/>
    </MuiThemeProvider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

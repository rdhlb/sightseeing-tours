import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from 'styled-components';
import { ThemeProvider as MuiThemeProvider, StylesProvider } from '@material-ui/core/styles';
import DateFnsUtils from '@material-ui/pickers/adapter/date-fns';
import { LocalizationProvider } from '@material-ui/pickers';

import { Ride } from './pages/ride/ride';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#EE7F00',
    },
    secondary: {
      main: '#fff',
    },
    background: {
      default: '#fff',
    },
  },
});

function App() {
  return (
    <LocalizationProvider dateAdapter={DateFnsUtils}>
      <StylesProvider injectFirst>
        <MuiThemeProvider theme={theme}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Ride />
          </ThemeProvider>
        </MuiThemeProvider>
      </StylesProvider>
    </LocalizationProvider>
  );
}

export default App;

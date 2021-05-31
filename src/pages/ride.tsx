import styled from 'styled-components';
import CssBaseline from '@material-ui/core/CssBaseline';
import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from 'styled-components';
import { ThemeProvider as MuiThemeProvider, StylesProvider } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { Toolbar, IconButton, AppBar, Button, Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import DateFnsUtils from '@material-ui/pickers/adapter/date-fns'; // choose your lib
import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  LocalizationProvider,
  MobileDateTimePicker,
} from '@material-ui/pickers';
import React, { useState } from 'react';
import { useSearchLocations } from '../hooks/useSearchLocations';

const durationOptions = Array.from(Array(10), (v, key) => key + 1);

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

export const StyledToolbar = styled(Toolbar)`
  padding: ${(props) => props.theme.spacing(1, 4)};
  justify-content: space-between;
  background-color: ${({ theme }) => theme.palette.background.default};
`;

const Booking = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(200px, 1fr));
  gap: 20px;
  background-color: ${({ theme }) => theme.palette.common.black};
  padding: ${(props) => props.theme.spacing(2, 4)};
`;

function Ride() {
  const [date, setDate] = useState<Date | null>(new Date());
  const { searchQuery, setSearchQuery, searchResults } = useSearchLocations();

  console.log(searchResults);

  return (
    <Container>
      <AppBar position="relative">
        <StyledToolbar>
          <Typography variant="h5" color="primary">
            <b>RIDE</b>
          </Typography>
        </StyledToolbar>
      </AppBar>
      <Booking>
        <Autocomplete
          id="locations-search"
          options={searchResults}
          getOptionLabel={(option) => option.label}
          filterOptions={(x) => x}
          renderInput={(params) => {
            return (
              <AutocompleteBaseField
                {...params}
                label="Pickup at"
                variant="standard"
                placeholder="Search for a place"
                InputLabelProps={{ shrink: true }}
              />
            );
          }}
          placeholder="test"
          onInputChange={(event, value) => setSearchQuery(value)}
        />
        <Autocomplete
          id="durations-select"
          options={durationOptions}
          renderInput={(params) => (
            <AutocompleteBaseField
              {...params}
              label="Ride duration"
              variant="standard"
              InputLabelProps={{ shrink: true }}
            />
          )}
        />
        <DateTimePicker
          disablePast
          renderInput={(props) => (
            <AutocompleteBaseField
              {...props}
              label="Pickup date / time"
              variant="standard"
              InputLabelProps={{ shrink: true }}
              helperText=""
            />
          )}
          value={date}
          onChange={(date) => setDate(date)}
        />
        <Button variant="contained" color="primary" disableElevation>
          Show Offers
        </Button>
      </Booking>
    </Container>
  );
}

const Container = styled.div`
  /* width: 100%; */
  /* height: 100vh; */
  /* background-color: black; */
  /* color: white; */
`;

export default Ride;

const AutocompleteBaseField = styled(TextField)`
  .MuiInputLabel-root:not(.Mui-focused) {
    color: ${(props) => props.theme.palette.secondary.main};
  }

  .MuiInput-input {
    color: ${(props) => props.theme.palette.secondary.main};
  }

  .MuiIconButton-root {
    color: ${(props) => props.theme.palette.secondary.main};
  }

  .MuiInput-underline {
    :before {
      border-bottom: 2px solid;
      border-bottom-color: ${(props) => props.theme.palette.secondary.main};
    }

    :hover:not(.Mui-disabled):before {
      border-bottom: 2px solid;
      border-bottom-color: ${(props) => props.theme.palette.secondary.main};
    }
  }
`;

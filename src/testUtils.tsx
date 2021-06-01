import { FC, ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { createMuiTheme } from '@material-ui/core/styles';
import { LocalizationProvider } from '@material-ui/pickers';
import DateFnsUtils from '@material-ui/pickers/adapter/date-fns';

const customTheme = createMuiTheme();

const AllTheProviders: FC = ({ children }) => {
  return (
    <LocalizationProvider dateAdapter={DateFnsUtils}>
      <ThemeProvider theme={customTheme}>{children}</ThemeProvider>
    </LocalizationProvider>
  );
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'queries'>) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';

export { customRender as render };

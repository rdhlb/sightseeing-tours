import { FC, ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { createMuiTheme } from '@material-ui/core/styles';

const customTheme = createMuiTheme();

const AllTheProviders: FC = ({ children }) => {
  return <ThemeProvider theme={customTheme}>{children}</ThemeProvider>;
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'queries'>) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';

export { customRender as render };

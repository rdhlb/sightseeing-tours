import React, { FC, ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
// import { ThemeProvider } from 'my-ui-lib'

const AllTheProviders: FC = ({ children }) => {
  return <div>children</div>;
  // return <ThemeProvider theme="light">{children}</ThemeProvider>;
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'queries'>) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';

export { customRender as render };

import { screen, waitFor } from '@testing-library/react';
import App from './App';
import { render } from './testUtils';

describe('App', () => {
  test('renders', async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('RIDE')).toBeVisible();
    });
  });
});

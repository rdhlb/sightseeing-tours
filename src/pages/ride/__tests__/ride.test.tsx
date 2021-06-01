import { screen, waitFor } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';

import { Ride } from '../ride';
import { render } from '../../../testUtils';
import { searchLocations } from '../../../api/locations';
import userEvent from '@testing-library/user-event';
import { fetchOffers } from '../../../api/offers';

jest.mock('../../../utils', () => ({ getCurrentDate: () => new Date('2021-07-18T00:00:00Z') }));
jest.mock('../../../api/locations');
jest.mock('../../../api/offers');

const getMockedPlaces = () => [
  { address: 'test address 1', label: 'test label 1', placeId: 'place id 1' },
  { address: 'test address 2', label: 'test label 2', placeId: 'place id 2' },
];

const getMockedOffers = () => [
  {
    offerIdentifier: 'test_offer_1',
    currency: 'USD',
    amount: 2393,
    vehicleType: {
      name: 'FIRST_CLASS',
      title: 'First Class',
      id: 1,
      images: {
        web: 'url',
      },
      description: 'Lux ride',
      benefits: [],
      nrOfBaggage: 2,
      nrOfPassengers: 2,
    },
  },
];

describe('Ride Experience', () => {
  it('renders booking form with default values', async () => {
    render(<Ride />);

    await waitFor(() => {
      expect(screen.getByLabelText(/pickup at/i)).toBeVisible();
      expect(screen.getByLabelText(/ride duration/i)).toHaveValue('1');
      expect(screen.getByDisplayValue('07/19/2021 03:00 am')).toBeVisible();
      expect(screen.getByRole('button', { name: /show offers/i })).toBeDisabled();
    });
  });

  it('allows to select pickup location from the list of options', async () => {
    mocked(searchLocations).mockResolvedValueOnce(getMockedPlaces());
    render(<Ride />);

    const placesInput = screen.getByLabelText(/pickup at/i);
    userEvent.type(placesInput, 'test');

    await waitFor(() => {
      const option = screen.getByText(/test label 1/i);
      expect(option).toBeVisible();
    });
  });

  it('validates form and unlocks Show Offers button', async () => {
    mocked(searchLocations).mockResolvedValue(getMockedPlaces());
    render(<Ride />);

    const placesInput = screen.getByLabelText(/pickup at/i);
    userEvent.type(placesInput, 'test');

    await waitFor(() => {
      const option = screen.getByText(/test label 2/i);
      userEvent.click(option, { button: 0 });
    });

    expect(screen.getByRole('button', { name: /show offers/i })).toBeEnabled();
  });

  it('renders offers in a list view based on params selected', async () => {
    mocked(searchLocations).mockResolvedValue(getMockedPlaces());
    mocked(fetchOffers).mockResolvedValue(getMockedOffers());
    render(<Ride />);

    const placesInput = screen.getByLabelText(/pickup at/i);
    userEvent.type(placesInput, 'test');

    await waitFor(() => {
      const option = screen.getByText(/test label 2/i);
      userEvent.click(option, { button: 0 });
    });

    userEvent.click(screen.getByRole('button', { name: /show offers/i }), { button: 0 });

    await waitFor(() => {
      expect(screen.getByText('First Class')).toBeVisible();
      expect(screen.getByText('Lux ride')).toBeVisible();
      expect(screen.getByText('Passengers: 2')).toBeVisible();
      expect(screen.getByText('Luggage: 2')).toBeVisible();
      expect(screen.getByText('23,93 $')).toBeVisible();
      expect(screen.getByRole('button', { name: /select/i })).toBeVisible();
    });
  });
});

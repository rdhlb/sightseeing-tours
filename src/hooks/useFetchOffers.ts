import { useAsyncCallback } from 'react-async-hook';
import { RideData, RideType } from './useRideDataReducer';

export interface RideOffer {
  offerIdentifier: string;
  currency: string;
  amount: number;
  vehicleType: {
    name: string;
    title: string;
    id: number;
    images: {
      web: string;
    };
    description: string;
    benefits: string[];
    nrOfBaggage: number;
    nrOfPassengers: number;
  };
}

type FetchOffersPayload = {
  originPlaceId: string;
  selectedStartDate: Date;
  /** @description in minutes */
  duration: string;
  type: RideType;
};

const fetchOffers = async (payload: FetchOffersPayload): Promise<RideOffer[]> => {
  const result = await fetch(`https://www.mydriver.com/api/v5/offers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (result.status !== 200) {
    throw new Error(`Oops... Error happened. Code: ${result.status}`);
  }
  return result.json();
};

export const useFetchOffers = ({
  location: originLocation,
  duration,
  type,
  startDate,
}: RideData) => {
  const { result, error, execute, loading } = useAsyncCallback(async () => {
    if (!originLocation?.placeId || !startDate) {
      throw new Error('Incorrect payload');
    }

    const durationMinutes = duration * 60;

    return fetchOffers({
      originPlaceId: originLocation.placeId,
      selectedStartDate: startDate,
      type,
      duration: durationMinutes.toString(),
    });
  });

  return {
    fetchOffers: execute,
    offers: result || [],
    error,
    loading,
  };
};

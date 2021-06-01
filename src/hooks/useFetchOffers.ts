import { useAsyncCallback } from 'react-async-hook';
import { fetchOffers } from '../api/offers';
import { RideData } from './useRideDataReducer';

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

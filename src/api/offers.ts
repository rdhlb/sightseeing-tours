import { RideType } from '../hooks/useRideDataReducer';

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

export const fetchOffers = async (payload: FetchOffersPayload): Promise<RideOffer[]> => {
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

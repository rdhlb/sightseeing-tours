import { useReducer } from 'react';
import { RideLocation } from './useSearchLocations';
import { add } from 'date-fns';

export enum RideType {
  Duration = 'DURATION',
}

const initialState: State = {
  type: RideType.Duration,
  duration: 1,
  location: null,
  startDate: add(new Date(), { days: 1 }),
};

export interface RideData {
  location: RideLocation | null;
  startDate: Date | null;
  /**
   * @description in hours
   */
  duration: number;
  type: RideType;
}

type State = RideData;

type Action =
  | { type: 'SET_LOCATION'; payload: RideLocation | null }
  | { type: 'SET_START_DATE'; payload: Date | null }
  | { type: 'SET_DURATION'; payload: number };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_LOCATION':
      return {
        ...state,
        location: action.payload,
      };

    case 'SET_START_DATE':
      return {
        ...state,
        startDate: action.payload,
      };

    case 'SET_DURATION':
      return {
        ...state,
        duration: action.payload,
      };

    default:
      return state;
  }
};

export const useRideDataReducer = () => {
  const [rideData, dispatch] = useReducer(reducer, initialState);

  const setLocation = (value: RideLocation | null) =>
    dispatch({ type: 'SET_LOCATION', payload: value });

  const setStartDate = (value: Date | null) => dispatch({ type: 'SET_START_DATE', payload: value });

  const setDuration = (value: string) =>
    dispatch({ type: 'SET_DURATION', payload: parseInt(value, 10) });

  const isValidSet = rideData.location?.placeId && rideData.startDate && rideData.duration;

  return { setLocation, setStartDate, setDuration, isValidSet, rideData };
};

import Autocomplete from '@material-ui/lab/Autocomplete';
import { DateTimePicker } from '@material-ui/pickers';
import React from 'react';
import { CircularProgress, Typography } from '@material-ui/core';

import { useSearchLocations } from '../../hooks/useSearchLocations';
import { useRideDataReducer } from '../../hooks/useRideDataReducer';
import {
  AutocompleteStyledField,
  Booking,
  StyledButton,
  OptionContainer,
  OffersLoadingContainer,
} from './ride.styled';
import { useFetchOffers } from '../../hooks/useFetchOffers';
import { Offers } from '../../components/offers/offers';
import { RideOffer } from '../../api/offers';
import { RideLocation } from '../../api/locations';

const durationOptions = Array.from(Array(10), (v, key) => key + 1).map(String);

const isLuxuryOffer = (offer: RideOffer) =>
  ['FIRST_CLASS', 'BUSINESS_VAN'].includes(offer.vehicleType.name);

export const Ride: React.FC = () => {
  const { setSearchQuery, searchResults, isSearchLoading } = useSearchLocations();
  const { setLocation, setStartDate, setDuration, isValidSet, rideData } = useRideDataReducer();
  const {
    fetchOffers,
    offers,
    loading: areOffersLoading,
    error: offersError,
  } = useFetchOffers(rideData);
  const luxuryOffers = offers.filter(isLuxuryOffer);

  return (
    <>
      <Booking>
        <Autocomplete
          freeSolo
          options={searchResults}
          getOptionLabel={(option) => option.label}
          filterOptions={(options) => options.filter((loc) => !!loc.placeId)}
          renderInput={(params) => {
            return (
              <AutocompleteStyledField
                {...params}
                label="Pickup at"
                variant="standard"
                placeholder="Search for a place"
                InputLabelProps={{ shrink: true }}
              />
            );
          }}
          loading={isSearchLoading}
          onInputChange={(event, value) => setSearchQuery(value)}
          onChange={(event, value) => setLocation(value as RideLocation | null)}
          value={rideData.location}
          getOptionSelected={(option) => option.placeId === rideData.location?.placeId}
          renderOption={(option) => (
            <OptionContainer>
              <Typography>{option.label}</Typography>
              <Typography variant="caption">{option.address}</Typography>
            </OptionContainer>
          )}
        />
        <Autocomplete
          freeSolo
          options={durationOptions}
          value={rideData.duration.toString()}
          renderInput={(params) => (
            <AutocompleteStyledField
              {...params}
              label="Ride duration"
              variant="standard"
              InputLabelProps={{ shrink: true }}
            />
          )}
          onChange={(event, value) => setDuration(value || '1')}
        />
        <DateTimePicker
          disablePast
          renderInput={(props) => (
            <AutocompleteStyledField
              {...props}
              label="Pickup date / time"
              variant="standard"
              InputLabelProps={{ shrink: true }}
              helperText=""
            />
          )}
          value={rideData.startDate}
          onChange={(date) => setStartDate(date)}
        />
        <StyledButton
          variant="contained"
          color="primary"
          disableElevation
          disabled={!isValidSet}
          onClick={fetchOffers}
        >
          Show Offers
        </StyledButton>
      </Booking>
      {areOffersLoading ? (
        <OffersLoadingContainer>
          <CircularProgress />
        </OffersLoadingContainer>
      ) : (
        <Offers items={luxuryOffers} error={offersError?.message} />
      )}
    </>
  );
};

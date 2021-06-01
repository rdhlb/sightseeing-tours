import { Typography } from '@material-ui/core';
import { FC } from 'react';
import { RideOffer } from '../../api/offers';
import {
  Container,
  Item,
  Description,
  Price,
  ImgPreview,
  Benefits,
  BenefitsItem,
  StyledCheckMarkIcon,
  SelectButton,
} from './offers.styled';

type Props = {
  items: RideOffer[];
};

export const Offers: FC<Props> = ({ items }) => {
  return (
    <Container>
      {items.map(({ offerIdentifier, vehicleType, amount, currency }) => {
        const { benefits, title, description, nrOfBaggage, nrOfPassengers, images } = vehicleType;
        const price = new Intl.NumberFormat('de-DE', { style: 'currency', currency }).format(
          amount / 100,
        );

        return (
          <Item key={offerIdentifier}>
            <Description>
              <div>
                <Typography variant="h5">{title}</Typography>
                <Typography variant="body1">{description}</Typography>
              </div>
              <div>
                <Typography>Passengers: {nrOfPassengers}</Typography>
                <Typography>Luggage: {nrOfBaggage}</Typography>
              </div>
            </Description>
            <Price>
              <ImgPreview src={images.web} alt="Car" />
              <Typography variant="h4">{price}</Typography>
            </Price>
            <Benefits>
              {benefits.map((benefit) => {
                return (
                  <BenefitsItem key={benefit}>
                    <StyledCheckMarkIcon /> <Typography> {benefit}</Typography>
                  </BenefitsItem>
                );
              })}
            </Benefits>
            <SelectButton
              size="large"
              variant="contained"
              color="primary"
              disableElevation
              fullWidth
            >
              Select
            </SelectButton>
          </Item>
        );
      })}
    </Container>
  );
};

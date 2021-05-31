import { CurrencyCode } from '../../constants';
import { AccountsByCurrency } from '../../hooks/useAccountsReducer';
import { Container } from './booking.styled';

type Props = {
  activeAccount: CurrencyCode;
  accounts: AccountsByCurrency;
  setActiveAccount: (value: CurrencyCode) => void;
};

export const Booking: React.FC<Props> = ({ activeAccount, accounts, setActiveAccount }) => {
  return <Container>asd</Container>;
};

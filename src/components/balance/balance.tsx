import { CurrencyCode } from '../../constants';
import { AccountsByCurrency } from '../../hooks/useAccountsReducer';
import { Container } from './balance.styled';

type OptionType = {
  label: string;
  value: string;
};

type Props = {
  activeAccount: CurrencyCode;
  accounts: AccountsByCurrency;
  setActiveAccount: (value: CurrencyCode) => void;
};

export const Balance: React.FC<Props> = ({ activeAccount, accounts, setActiveAccount }) => {
  return <Container>asd</Container>;
};

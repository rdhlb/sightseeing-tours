import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { SM_BREAKPOINT } from '../../constants';

export const Booking = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(200px, 1fr));
  gap: ${(props) => props.theme.spacing(2)}px;
  background-color: ${({ theme }) => theme.palette.common.black};
  padding: ${(props) => props.theme.spacing(2, 4)};

  @media (max-width: ${SM_BREAKPOINT}px) {
    grid-template-columns: minmax(200px, 1fr);
    padding: ${(props) => props.theme.spacing(1, 2)};
  }
`;

export const AutocompleteStyledField = styled(TextField)`
  .MuiInputLabel-root:not(.Mui-focused) {
    color: ${(props) => props.theme.palette.secondary.main};
  }

  .MuiInput-input {
    color: ${(props) => props.theme.palette.secondary.main};
  }

  .MuiIconButton-root {
    color: ${(props) => props.theme.palette.secondary.main};
  }

  .MuiInput-underline {
    :before {
      border-bottom: 2px solid;
      border-bottom-color: ${(props) => props.theme.palette.secondary.main};
    }

    :hover:not(.Mui-disabled):before {
      border-bottom: 2px solid;
      border-bottom-color: ${(props) => props.theme.palette.secondary.main};
    }
  }
`;

export const StyledButton = styled(Button)`
  color: ${(props) => props.theme.palette.secondary.main};

  &.Mui-disabled {
    background-color: ${({ theme }) => theme.palette.grey['A200']};
  }
`;

export const OptionContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const OffersLoadingContainer = styled.div`
  display: flex;
  padding-top: ${(props) => props.theme.spacing(2)}px;
  justify-content: center;
`;

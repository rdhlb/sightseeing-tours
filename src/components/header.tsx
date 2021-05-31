import styled from 'styled-components';
import { Toolbar, AppBar, Typography } from '@material-ui/core';
import { FC } from 'react';

const StyledToolbar = styled(Toolbar)`
  padding: ${(props) => props.theme.spacing(1, 4)};
  justify-content: space-between;
  background-color: ${({ theme }) => theme.palette.background.default};
`;

export const Header: FC = () => {
  return (
    <AppBar position="relative">
      <StyledToolbar>
        <Typography variant="h5" color="primary">
          <b>RIDE</b>
        </Typography>
      </StyledToolbar>
    </AppBar>
  );
};

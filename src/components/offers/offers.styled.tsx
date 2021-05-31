import styled from 'styled-components';
import { Paper, Button } from '@material-ui/core';
import { ReactComponent as CheckMarkIcon } from '../../assets/check.svg';
import { SM_BREAKPOINT } from '../../constants';

export const Container = styled.div`
  padding: ${(props) => props.theme.spacing(2, 4)};

  @media (max-width: ${SM_BREAKPOINT}px) {
    padding: ${(props) => props.theme.spacing(1, 2)};
  }
`;

export const Item = styled(Paper)`
  padding: ${(props) => props.theme.spacing(2)}px;
  margin-bottom: ${(props) => props.theme.spacing(2)}px;
`;

export const Description = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  @media (max-width: ${SM_BREAKPOINT}px) {
    flex-direction: column;
  }
`;

export const Price = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: ${SM_BREAKPOINT}px) {
    flex-direction: column;
  }
`;

export const ImgPreview = styled.img`
  display: block;
  max-width: 200px;
`;

export const StyledCheckMarkIcon = styled(CheckMarkIcon)`
  color: ${(props) => props.theme.palette.primary.main};
  width: 20px;
  min-width: 20px;
`;

export const Benefits = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

export const BenefitsItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: ${(props) => props.theme.spacing(0.5)}px;
`;

export const SelectButton = styled(Button)`
  margin-top: ${(props) => props.theme.spacing(1)}px;
  color: ${(props) => props.theme.palette.secondary.main};
`;

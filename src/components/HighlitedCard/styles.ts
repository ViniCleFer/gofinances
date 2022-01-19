import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';

interface Props {
  type: 'up' | 'down' | 'total';
}

export const Container = styled.View`
  width: ${RFValue(300)}px;
  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 5px;
  padding: 19px 23px;
  padding-bottom: ${RFValue(42)}px;
  margin-right: 16px;

  ${(props: Props) =>
    props.type === 'total' &&
    css`
      background-color: ${({ theme }) => theme.colors.secondary};
    `}
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};

  ${(props: Props) =>
    props.type === 'total' &&
    css`
      color: ${({ theme }) => theme.colors.shape};
    `}
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(40)}px;

  ${(props: Props) =>
    props.type === 'up' &&
    css`
      color: ${({ theme }) => theme.colors.success};
    `}

  ${(props: Props) =>
    props.type === 'down' &&
    css`
      color: ${({ theme }) => theme.colors.attention};
    `}

  ${(props: Props) =>
    props.type === 'total' &&
    css`
      color: ${({ theme }) => theme.colors.shape};
    `}
`;

export const Footer = styled.View``;

export const Amount = styled.Text`
  color: ${({ theme }) => theme.colors.text_dark};
  font-size: ${RFValue(32)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  margin-top: 38px;

  ${(props: Props) =>
    props.type === 'total' &&
    css`
      color: ${({ theme }) => theme.colors.shape};
    `}
`;

export const LastTransaction = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(12)}px;
  font-family: ${({ theme }) => theme.fonts.regular};

  ${(props: Props) =>
    props.type === 'total' &&
    css`
      color: ${({ theme }) => theme.colors.shape};
    `}
`;

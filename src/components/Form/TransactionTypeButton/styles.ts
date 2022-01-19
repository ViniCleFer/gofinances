import { TouchableOpacity } from 'react-native';
import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';

interface TransactionTypeButtonProps {
  type: 'positive' | 'negative';
  selected: boolean;
}

export const Container = styled(TouchableOpacity).attrs({
  activeOpacity: 0.7,
})`
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.shape};
  width: 48%;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  padding: 16px;
  border-radius: 5px;
  border-width: 1.5px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.text};

  ${(props: TransactionTypeButtonProps) =>
    props.selected &&
    props.type === 'positive' &&
    css`
      background-color: ${({ theme }) => theme.colors.success_light};
      border-color: transparent;
    `}

  ${(props: TransactionTypeButtonProps) =>
    props.selected &&
    props.type === 'negative' &&
    css`
      border-color: transparent;
      background-color: ${({ theme }) => theme.colors.attention_light};
    `}
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  margin-left: 14px;
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(24)}px;

  ${(props: TransactionTypeButtonProps) =>
    props.type === 'positive' &&
    css`
      color: ${({ theme }) => theme.colors.success};
    `}

  ${(props: TransactionTypeButtonProps) =>
    props.type === 'negative' &&
    css`
      color: ${({ theme }) => theme.colors.attention};
    `}
`;

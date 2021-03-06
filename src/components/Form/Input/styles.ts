import { TextInput } from 'react-native';
import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled(TextInput)`
  background-color: ${({ theme }) => theme.colors.shape};
  color: ${({ theme }) => theme.colors.text_dark};
  width: 100%;
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  align-items: center;
  padding: 18px 16px;
  border-radius: 5px;
  margin-bottom: 8px;
`;

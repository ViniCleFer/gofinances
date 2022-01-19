import { RectButton } from 'react-native-gesture-handler';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};

  width: 100%;
  height: ${RFPercentage(80)}px;
  justify-content: flex-end;
  align-items: center;
  padding: 0 32px;
  padding-bottom: 69px;
`;

export const TitleWrapper = styled.View`
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(30)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  text-align: center;
  margin: 40px 0 80px;
`;

export const Subtitle = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  text-align: center;
`;

export const Footer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.secondary};
  padding: 0 32px;
`;

export const FooterWrapper = styled.View`
  top: -${RFValue(28)}px;
`;

export const SignInButton = styled(RectButton)`
  background-color: ${({ theme }) => theme.colors.shape};
  flex-direction: row;
  align-items: center;
  height: ${RFValue(56)}px;
  border-radius: 5px;
  margin-bottom: 16px;
  justify-content: center;
  width: 100%;
`;

export const IconContainer = styled.View`
  border-right-width: 1px;
  border-color: ${({ theme }) => theme.colors.background};
  width: ${RFValue(56)}px;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

export const SignInButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  text-align: center;
  flex: 1;
`;

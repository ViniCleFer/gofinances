import React, { useState } from 'react';
import { Alert, Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';

import { useAuth } from '../../hooks/auth';

import { Load } from '../../components';

import GoogleSvg from '../../assets/google.svg';
import AppleSvg from '../../assets/apple.svg';
import LogoSvg from '../../assets/logo.svg';

import {
  Container,
  Header,
  TitleWrapper,
  Title,
  Subtitle,
  Footer,
  FooterWrapper,
  SignInButton,
  IconContainer,
  SignInButtonText,
} from './styles';

function SignIn() {
  const { signInWithGoogle, signInWithApple } = useAuth();
  const theme = useTheme();

  const [isLoading, setIsLoading] = useState(false);

  async function handleSignInWithGoogle() {
    try {
      setIsLoading(true);
      return await signInWithGoogle();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      Alert.alert('Não foi possível conectar a conta Google.');
    }
  }

  async function handleSignInWithApple() {
    try {
      setIsLoading(true);
      return await signInWithApple();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      Alert.alert('Não foi possível conectar a conta Apple.');
    }
  }

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg width={RFValue(120)} height={RFValue(68)} />
          <Title>Controle suas finanças de forma muito simples</Title>
        </TitleWrapper>
        <Subtitle>Faça seu login com uma das contas abaixo</Subtitle>
      </Header>
      <Footer>
        <FooterWrapper>
          <SignInButton onPress={handleSignInWithGoogle}>
            <IconContainer>
              <GoogleSvg />
            </IconContainer>
            <SignInButtonText>Entrar com Google</SignInButtonText>
          </SignInButton>
          {Platform.OS === 'ios' && (
            <SignInButton onPress={handleSignInWithApple}>
              <IconContainer>
                <AppleSvg />
              </IconContainer>
              <SignInButtonText>Entrar com Apple</SignInButtonText>
            </SignInButton>
          )}
        </FooterWrapper>

        {isLoading && <Load color={theme.colors.shape} />}
      </Footer>
    </Container>
  );
}

export default SignIn;

import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { Container, Icon, Title } from './styles';

interface CategorySelectButtonProps extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
}

export const CategorySelectButton = ({
  title,
  onPress,
}: CategorySelectButtonProps) => {
  return (
    <Container onPress={onPress}>
      <Title>{title}</Title>
      <Icon name='chevron-down' />
    </Container>
  );
};

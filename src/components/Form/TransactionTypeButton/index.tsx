import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { Container, Title, Icon } from './styles';

interface TransactionTypeButtonProps extends TouchableOpacityProps {
  title: string;
  type: 'positive' | 'negative';
  selected: boolean;
}

const icon = {
  positive: 'arrow-up-circle',
  negative: 'arrow-down-circle',
};

export const TransactionTypeButton = ({
  title,
  type,
  selected,
  onPress,
}: TransactionTypeButtonProps) => {
  return (
    <Container selected={selected} type={type} onPress={onPress}>
      <Icon name={icon[type]} type={type} />
      <Title>{title}</Title>
    </Container>
  );
};

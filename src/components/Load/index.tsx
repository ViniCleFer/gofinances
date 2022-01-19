import React from 'react';
import { ActivityIndicatorProps } from 'react-native';
import { useTheme } from 'styled-components/native';

import { Loading } from './styles';

type LoadProps = ActivityIndicatorProps;

export const Load = ({ color }: LoadProps) => {
  const theme = useTheme();

  return <Loading color={color || theme.colors.primary} size='large' />;
};

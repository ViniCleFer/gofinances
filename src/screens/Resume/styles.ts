import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import { BorderlessButton } from 'react-native-gesture-handler';

interface CategoryProps {
  color: string;
}

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};

  width: 100%;
  height: ${RFValue(113)}px;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 19px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    width: '100%',
    paddingTop: 31,
    paddingHorizontal: 24,

    justifyContent: 'center',
  },
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
`;

export const MonthContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const IconButton = styled(BorderlessButton)``;

export const Icon = styled(Feather)`
  color: ${({ theme }) => theme.colors.text_dark};
  font-size: ${RFValue(24)}px;
`;

export const MonthText = styled.Text`
  color: ${({ theme }) => theme.colors.text_dark};
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const PowerIcon = styled(Feather)`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${RFValue(24)}px;
`;

export const ChartContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

export const CategoriesList = styled.View`
  margin-bottom: 16px;
`;

export const CategoryContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  height: 48px;
  background-color: ${({ theme }) => theme.colors.shape};
  align-items: center;
  padding: 0 16px;
  border-radius: 5px;
  margin-bottom: 8px;
  border-left-width: 4px;
  border-style: solid;
  border-color: ${({ color }: CategoryProps) => color};
`;

export const CategoryName = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;
export const Total = styled.Text`
  color: ${({ theme }) => theme.colors.text_dark};
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
`;

export const LoadContainer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  align-items: center;
  justify-content: center;
`;
